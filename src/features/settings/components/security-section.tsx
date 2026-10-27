'use client';

import { useState } from 'react';

import { Laptop, Smartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Settings } from '../types';
import { ChangePasswordDialog } from './change-password-dialog';
import { Toggle } from './controls';
import { SettingRow, SettingsSection } from './setting-row';

type Session = {
    id: string;
    device: string;
    kind: 'desktop' | 'mobile';
    location: string;
    lastActive: string;
    current?: boolean;
};

const INITIAL_SESSIONS: Session[] = [
    {
        id: 's1',
        device: 'Chrome on Windows',
        kind: 'desktop',
        location: 'Kraków, PL',
        lastActive: 'Active now',
        current: true,
    },
    {
        id: 's2',
        device: 'Safari on iPhone',
        kind: 'mobile',
        location: 'Kraków, PL',
        lastActive: '2h ago',
    },
    {
        id: 's3',
        device: 'Firefox on macOS',
        kind: 'desktop',
        location: 'Berlin, DE',
        lastActive: '3 days ago',
    },
];

export function SecuritySection({
    settings,
    update,
}: {
    settings: Settings;
    update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}) {
    const [sessions, setSessions] = useState(INITIAL_SESSIONS);
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    const others = sessions.filter((s) => !s.current);

    return (
        <div className='flex flex-col gap-6'>
            <SettingsSection
                eyebrow='Access'
                title='Security'
                description='Protect your account and the data in it.'>
                <SettingRow
                    title='Two-factor authentication'
                    description='Require a one-time code from your authenticator app at sign-in.'>
                    <div className='flex items-center gap-3'>
                        <Badge variant={settings.twoFactor ? 'positive' : 'outline'}>
                            {settings.twoFactor ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <Toggle
                            label='Two-factor authentication'
                            checked={settings.twoFactor}
                            onCheckedChange={(v) => update('twoFactor', v)}
                        />
                    </div>
                </SettingRow>

                <SettingRow
                    title='Password'
                    description={
                        passwordUpdated
                            ? 'Password updated just now.'
                            : 'Use a unique password of at least 8 characters.'
                    }>
                    <ChangePasswordDialog
                        onChanged={() => setPasswordUpdated(true)}
                    />
                </SettingRow>
            </SettingsSection>

            <SettingsSection
                eyebrow='Devices'
                title='Active sessions'
                description='Where you are currently signed in.'>
                {sessions.map((s) => {
                    const Icon = s.kind === 'mobile' ? Smartphone : Laptop;
                    return (
                        <div
                            key={s.id}
                            className='flex items-center gap-4 py-4'>
                            <span
                                aria-hidden
                                className='inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground'>
                                <Icon size={16} strokeWidth={1.75} />
                            </span>
                            <div className='min-w-0 flex-1'>
                                <p className='flex flex-wrap items-center gap-2 text-[14px] font-medium'>
                                    {s.device}
                                    {s.current && (
                                        <Badge variant='secondary'>
                                            This device
                                        </Badge>
                                    )}
                                </p>
                                <p className='font-mono text-[12px] text-muted-foreground'>
                                    {s.location} · {s.lastActive}
                                </p>
                            </div>
                            {!s.current && (
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() =>
                                        setSessions((prev) =>
                                            prev.filter((x) => x.id !== s.id),
                                        )
                                    }>
                                    Revoke
                                </Button>
                            )}
                        </div>
                    );
                })}

                <div className='flex items-center justify-between gap-4 py-4'>
                    <p className='text-[13px] text-muted-foreground'>
                        {others.length === 0
                            ? 'No other active sessions.'
                            : `${others.length} other ${others.length === 1 ? 'session' : 'sessions'}`}
                    </p>
                    <Button
                        variant='outline'
                        size='sm'
                        disabled={others.length === 0}
                        onClick={() =>
                            setSessions((prev) => prev.filter((s) => s.current))
                        }>
                        Sign out everywhere else
                    </Button>
                </div>
            </SettingsSection>
        </div>
    );
}
