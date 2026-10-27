'use client';

import { Input } from '@/components/ui/input';

import type { Settings } from '../types';
import { SettingRow, SettingsSection } from './setting-row';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isProfileValid(s: Pick<Settings, 'name' | 'email'>) {
    return s.name.trim().length > 0 && EMAIL_RE.test(s.email.trim());
}

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '–';
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

const inputClass =
    'h-9 w-full bg-card px-3 text-[13px] shadow-none focus-visible:border-foreground focus-visible:ring-0 sm:w-72';

export function ProfileSection({
    settings,
    update,
}: {
    settings: Settings;
    update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}) {
    const emailInvalid =
        settings.email.length > 0 && !EMAIL_RE.test(settings.email.trim());
    const nameInvalid = settings.name.length > 0 && !settings.name.trim();

    return (
        <SettingsSection
            eyebrow='Account'
            title='Profile'
            description='How you appear in Nordwell and where we send account email.'>
            <div className='flex items-center gap-4 py-5'>
                <span
                    aria-hidden
                    className='inline-flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-[15px] font-semibold tracking-tight'>
                    {initials(settings.name)}
                </span>
                <div className='min-w-0'>
                    <p className='truncate text-[15px] font-medium'>
                        {settings.name.trim() || 'Unnamed'}
                    </p>
                    <p className='truncate font-mono text-[12px] text-muted-foreground'>
                        {settings.email || 'No email'}
                    </p>
                </div>
            </div>

            <SettingRow title='Full name' htmlFor='settings-name'>
                <div className='w-full'>
                    <Input
                        id='settings-name'
                        value={settings.name}
                        onChange={(e) => update('name', e.target.value)}
                        autoComplete='name'
                        aria-invalid={nameInvalid || undefined}
                        className={inputClass}
                    />
                </div>
            </SettingRow>

            <SettingRow
                title='Email'
                description='Used for sign-in, alerts and statements.'
                htmlFor='settings-email'>
                <div className='w-full'>
                    <Input
                        id='settings-email'
                        type='email'
                        value={settings.email}
                        onChange={(e) => update('email', e.target.value)}
                        autoComplete='email'
                        aria-invalid={emailInvalid || undefined}
                        className={inputClass}
                    />
                    {emailInvalid && (
                        <p className='mt-1 text-[12px] text-destructive'>
                            Enter a valid email address.
                        </p>
                    )}
                </div>
            </SettingRow>
        </SettingsSection>
    );
}
