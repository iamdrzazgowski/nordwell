'use client';

import type { Settings } from '../types';
import { Segmented, SelectField } from './controls';
import { SettingRow, SettingsSection } from './setting-row';

const CURRENCIES = [
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'USD', label: 'USD ($)' },
    { value: 'PLN', label: 'PLN (zł)' },
] as const;


const THEMES = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
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
            description='Currency and how Nordwell looks.'>
            <SettingRow
                title='Display currency'
                description='Portfolio values, cash and charts are shown in this currency.'
                htmlFor='settings-currency'>
                <SelectField
                    id='settings-currency'
                    label='Display currency'
                    value={settings.currency}
                    options={CURRENCIES}
                    onChange={(v) => update('currency', v)}
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
        </SettingsSection>
    );
}
