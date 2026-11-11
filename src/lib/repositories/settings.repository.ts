import 'server-only';
import { prisma } from '@/lib/prisma';
import { getFxRate } from '@/lib/market-data/fx';
import {
    DEFAULT_PREFERENCES,
    isCurrency,
    type Currency,
    type Preferences,
    type Theme,
} from '@/features/settings/types';

const THEME_TO_DB = { system: 'SYSTEM', light: 'LIGHT', dark: 'DARK' } as const;
const THEME_FROM_DB = {
    SYSTEM: 'system',
    LIGHT: 'light',
    DARK: 'dark',
} as const satisfies Record<string, Theme>;

/**
 * Brak wiersza UserSettings = wartości domyślne; waluta jest czytana z
 * `Portfolio.baseCurrency`, żeby UI zawsze zgadzało się z wycenami.
 */
export async function getPreferences(userId: string): Promise<Preferences> {
    const [settings, portfolio] = await Promise.all([
        prisma.userSettings.findUnique({ where: { userId } }),
        prisma.portfolio.findUnique({
            where: { userId },
            select: { baseCurrency: true },
        }),
    ]);

    const currency = portfolio?.baseCurrency ?? settings?.currency;
    return {
        currency:
            currency && isCurrency(currency)
                ? currency
                : DEFAULT_PREFERENCES.currency,
        theme: settings
            ? THEME_FROM_DB[settings.theme]
            : DEFAULT_PREFERENCES.theme,
    };
}

/**
 * Zmiana waluty przelicza gotówkę i historię snapshotów (obie wartości są
 * trzymane w walucie bazowej) po bieżącym kursie, żeby wykresy nie
 * "skakały". Holdings i transakcje są w walucie aktywa — bez zmian.
 */
async function changeBaseCurrency(userId: string, next: Currency) {
    const portfolio = await prisma.portfolio.findUniqueOrThrow({
        where: { userId },
    });
    if (portfolio.baseCurrency === next) return;

    const rate = await getFxRate(portfolio.baseCurrency, next);
    if (rate == null || rate <= 0) {
        throw new Error(
            `Exchange rate unavailable for ${portfolio.baseCurrency} to ${next}`,
        );
    }

    await prisma.$transaction([
        prisma.portfolio.update({
            where: { id: portfolio.id },
            data: {
                baseCurrency: next,
                cashBalance: { multiply: rate },
            },
        }),
        prisma.portfolioSnapshot.updateMany({
            where: { portfolioId: portfolio.id },
            data: {
                totalValue: { multiply: rate },
                investedValue: { multiply: rate },
                cashValue: { multiply: rate },
            },
        }),
    ]);
}

export async function updatePreferences(
    userId: string,
    { currency, theme }: Preferences,
) {
    await changeBaseCurrency(userId, currency);

    await prisma.userSettings.upsert({
        where: { userId },
        create: { userId, currency, theme: THEME_TO_DB[theme] },
        update: { currency, theme: THEME_TO_DB[theme] },
    });
}
