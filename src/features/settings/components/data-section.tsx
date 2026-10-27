'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DeleteAccountDialog } from './delete-account-dialog';
import { SettingRow, SettingsSection } from './setting-row';

type Format = 'CSV' | 'JSON';
type ExportState = { format: Format; status: 'preparing' | 'ready' } | null;

export function DataSection() {
    const [state, setState] = useState<ExportState>(null);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, []);

    const startExport = (format: Format) => {
        if (state?.status === 'preparing') return;
        setState({ format, status: 'preparing' });
        timers.current.push(
            setTimeout(() => setState({ format, status: 'ready' }), 900),
            setTimeout(() => setState(null), 3500),
        );
    };

    const label = (format: Format) => {
        if (state?.format === format) {
            return state.status === 'preparing' ? 'Preparing…' : 'Ready';
        }
        return format;
    };

    return (
        <div className='flex flex-col gap-6'>
            <SettingsSection
                eyebrow='Your data'
                title='Export'
                description='Download everything Nordwell holds about your portfolio.'>
                <SettingRow
                    title='Transactions and holdings'
                    description='Every buy, sell, deposit and withdrawal, plus current positions.'>
                    <div className='flex items-center gap-2'>
                        {(['CSV', 'JSON'] as const).map((format) => (
                            <Button
                                key={format}
                                variant='outline'
                                className='h-9 min-w-24 px-3.5 font-mono text-[12px]'
                                disabled={state?.status === 'preparing'}
                                onClick={() => startExport(format)}>
                                {state?.format === format &&
                                state.status === 'ready' ? (
                                    <Check size={14} />
                                ) : (
                                    <Download size={14} />
                                )}
                                {label(format)}
                            </Button>
                        ))}
                    </div>
                </SettingRow>
            </SettingsSection>

            <SettingsSection
                eyebrow='Danger zone'
                title='Delete account'
                tone='danger'>
                <SettingRow
                    title='Delete your account'
                    description='Permanently remove your account and all associated data.'>
                    <DeleteAccountDialog />
                </SettingRow>
            </SettingsSection>
        </div>
    );
}
