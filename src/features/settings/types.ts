import type { Range } from '@/lib/market-data/range';

export type Currency = 'EUR' | 'USD' | 'GBP' | 'PLN';
export type Language = 'en' | 'pl' | 'de';
export type Theme = 'system' | 'light' | 'dark';
export type NumberFormat = 'en' | 'eu';


export type Settings = {
    name: string;
    email: string;

    currency: Currency;
    language: Language;
    theme: Theme;
    numberFormat: NumberFormat;
    defaultRange: Range;

};

export type SectionId = 'profile' | 'preferences' | 'security' | 'data';

/** Which settings belong to which section — used for the "unsaved" dots. */
export const SECTION_FIELDS: Record<SectionId, (keyof Settings)[]> = {
    profile: ['name', 'email'],
    preferences: [
        'currency',
        'language',
        'theme',
        'numberFormat',
        'defaultRange',
    ],
    security: [],
    data: [],
};

export const INITIAL_SETTINGS: Settings = {
    name: 'Adrian Kowalski',
    email: 'adrian@example.com',

    currency: 'EUR',
    language: 'en',
    theme: 'system',
    numberFormat: 'en',
    defaultRange: '1M',

};
