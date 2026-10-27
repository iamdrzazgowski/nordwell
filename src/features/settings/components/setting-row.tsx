import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function SettingsSection({
    eyebrow,
    title,
    description,
    children,
    tone = 'default',
}: {
    eyebrow: string;
    title: string;
    description?: string;
    children: ReactNode;
    tone?: 'default' | 'danger';
}) {
    return (
        <Card className='gap-0 py-0'>
            <div className='border-b px-6 py-5'>
                <div className='mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                    {eyebrow}
                </div>
                <h2
                    className={cn(
                        'text-lg font-semibold leading-snug tracking-[-0.01em]',
                        tone === 'danger' && 'text-destructive',
                    )}>
                    {title}
                </h2>
                {description && (
                    <p className='mt-1 max-w-xl text-[13px] text-muted-foreground'>
                        {description}
                    </p>
                )}
            </div>
            <div className='divide-y divide-border px-6'>{children}</div>
        </Card>
    );
}

export function SettingRow({
    title,
    description,
    htmlFor,
    children,
    disabled,
}: {
    title: string;
    description?: string;
    htmlFor?: string;
    children: ReactNode;
    disabled?: boolean;
}) {
    const titleClass = cn(
        'block text-[14px] font-medium leading-snug',
        disabled && 'text-muted-foreground',
    );

    return (
        <div className='flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8'>
            <div className='min-w-0'>
                {htmlFor ? (
                    <label htmlFor={htmlFor} className={titleClass}>
                        {title}
                    </label>
                ) : (
                    <p className={titleClass}>{title}</p>
                )}
                {description && (
                    <p className='mt-1 max-w-md text-[13px] text-muted-foreground'>
                        {description}
                    </p>
                )}
            </div>
            <div className='flex shrink-0 items-center sm:justify-end'>
                {children}
            </div>
        </div>
    );
}
