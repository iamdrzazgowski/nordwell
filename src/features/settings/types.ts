export type Currency = 'EUR' | 'USD' | 'GBP' | 'PLN';
export type Theme = 'system' | 'light' | 'dark';

export type Settings = {
    name: string;

    currency: Currency;
    theme: Theme;
};

export type SectionId = 'profile' | 'preferences' | 'security' | 'data';

/** Which settings belong to which section — used for the "unsaved" dots. */
export const SECTION_FIELDS: Record<SectionId, (keyof Settings)[]> = {
    profile: ['name'],
    preferences: ['currency', 'theme'],
    security: [],
    data: [],
};

export const INITIAL_SETTINGS: Settings = {
    name: '',

    currency: 'EUR',
    theme: 'system',
};
