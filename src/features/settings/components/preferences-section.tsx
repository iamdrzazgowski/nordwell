'use client';

import { RangeTabs } from '@/components/shared/range-tabs';

import type { Settings } from '../types';
import { Segmented, SelectField } from './controls';
import { SettingRow, SettingsSection } from './setting-row';

const CURRENCIES = [
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'USD', label: 'USD ($)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'PLN', label: 'PLN (zł)' },
] as const;

const LANGUAGES = [
    { value: 'en', label: 'English' },
    { value: 'pl', label: 'Polski' },
    { value: 'de', label: 'Deutsch' },
] as const;

const THEMES = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
] as const;

const NUMBER_FORMATS = [
    { value: 'en', label: '1,234.56' },
    { value: 'eu', label: '1.234,56' },
] as const;

export function PreferencesSection({
    settings,
    update,
}: {
    settings: Settings;
    update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}) {
    return (
        <SettingsSection
            eyebrow='Interface'
            title='Preferences'
            description='Currency, formatting and how Nordwell looks.'>
            <SettingRow
                title='Display currency'
                description='All values are converted to this currency.'
                htmlFor='settings-currency'>
                <SelectField
                    id='settings-currency'
                    label='Display currency'
                    value={settings.currency}
                    options={CURRENCIES}
                    onChange={(v) => update('currency', v)}
                />
            </SettingRow>

            <SettingRow title='Language' htmlFor='settings-language'>
                <SelectField
                    id='settings-language'
                    label='Language'
                    value={settings.language}
                    options={LANGUAGES}
                    onChange={(v) => update('language', v)}
                />
            </SettingRow>

            <SettingRow
                title='Number format'
                description='Thousands and decimal separators.'>
                <Segmented
                    label='Number format'
                    value={settings.numberFormat}
                    options={NUMBER_FORMATS}
                    onChange={(v) => update('numberFormat', v)}
                    className='font-mono'
                />
            </SettingRow>

            <SettingRow title='Theme'>
                <Segmented
                    label='Theme'
                    value={settings.theme}
                    options={THEMES}
                    onChange={(v) => update('theme', v)}
                />
            </SettingRow>

            <SettingRow
                title='Default chart range'
                description='Range shown first on the dashboard and portfolio.'>
                <RangeTabs
                    value={settings.defaultRange}
                    onChange={(r) => update('defaultRange', r)}
                />
            </SettingRow>
        </SettingsSection>
    );
}
