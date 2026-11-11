export const CURRENCIES = ['EUR', 'USD', 'PLN'] as const;
export const THEMES = ['system', 'light', 'dark'] as const;

export type Currency = (typeof CURRENCIES)[number];
export type Theme = (typeof THEMES)[number];

export type Settings = {
    name: string;

    currency: Currency;
    theme: Theme;
};

export type Preferences = Pick<Settings, 'currency' | 'theme'>;

export type SectionId = 'profile' | 'preferences' | 'security' | 'data';

/** Which settings belong to which section — used for the "unsaved" dots. */
export const SECTION_FIELDS: Record<SectionId, (keyof Settings)[]> = {
    profile: ['name'],
    preferences: ['currency', 'theme'],
    security: [],
    data: [],
};

export const DEFAULT_PREFERENCES: Preferences = {
    currency: 'USD',
    theme: 'system',
};

export function isCurrency(value: string): value is Currency {
    return (CURRENCIES as readonly string[]).includes(value);
}
