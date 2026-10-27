'use client';

import { Input } from '@/components/ui/input';

import type { Settings } from '../types';
import { SelectField, Toggle } from './controls';
import { SettingRow, SettingsSection } from './setting-row';

const STATEMENTS = [
    { value: 'off', label: 'Off' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
] as const;

export function isThresholdValid(value: string) {
    const n = Number(value);
    return value.trim() !== '' && n >= 0.1 && n <= 50;
}

export function NotificationsSection({
    settings,
    update,
}: {
    settings: Settings;
    update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}) {
    const thresholdInvalid =
        settings.priceAlerts && !isThresholdValid(settings.alertThreshold);

    return (
        <SettingsSection
            eyebrow='Alerts'
            title='Notifications'
            description='Quiet by default. Choose what is worth an email.'>
            <SettingRow
                title='Price alerts'
                description='Get notified when a holding or watchlist asset moves sharply in a day.'>
                <Toggle
                    label='Price alerts'
                    checked={settings.priceAlerts}
                    onCheckedChange={(v) => update('priceAlerts', v)}
                />
            </SettingRow>

            <SettingRow
                title='Alert threshold'
                description='Daily move that triggers an alert.'
                htmlFor='settings-threshold'
                disabled={!settings.priceAlerts}>
                <div className='sm:text-right'>
                    <div className='relative w-full sm:w-32'>
                        <Input
                            id='settings-threshold'
                            type='number'
                            inputMode='decimal'
                            min='0.1'
                            max='50'
                            step='0.1'
                            value={settings.alertThreshold}
                            disabled={!settings.priceAlerts}
                            aria-invalid={thresholdInvalid || undefined}
                            onChange={(e) =>
                                update('alertThreshold', e.target.value)
                            }
                            className='h-9 bg-card pr-8 pl-3 text-right font-mono text-[13px] tabular-nums shadow-none focus-visible:border-foreground focus-visible:ring-0'
                        />
                        <span
                            aria-hidden
                            className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[12px] text-muted-foreground'>
                            %
                        </span>
                    </div>
                    {thresholdInvalid && (
                        <p className='mt-1 text-[12px] text-destructive'>
                            Use a value between 0.1 and 50.
                        </p>
                    )}
                </div>
            </SettingRow>

            <SettingRow
                title='Daily summary'
                description='Portfolio value and top movers, every weekday evening.'>
                <Toggle
                    label='Daily summary'
                    checked={settings.dailySummary}
                    onCheckedChange={(v) => update('dailySummary', v)}
                />
            </SettingRow>

            <SettingRow
                title='Weekly report'
                description='Performance, allocation changes and recent activity.'>
                <Toggle
                    label='Weekly report'
                    checked={settings.weeklyReport}
                    onCheckedChange={(v) => update('weeklyReport', v)}
                />
            </SettingRow>

            <SettingRow
                title='Statements'
                description='PDF statement delivered by email.'
                htmlFor='settings-statements'>
                <SelectField
                    id='settings-statements'
                    label='Statements'
                    value={settings.statements}
                    options={STATEMENTS}
                    onChange={(v) => update('statements', v)}
                />
            </SettingRow>
        </SettingsSection>
    );
}
