'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Toggle({
    checked,
    onCheckedChange,
    label,
    disabled,
}: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    disabled?: boolean;
}) {
    return (
        <SwitchPrimitive.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            aria-label={label}
            className='relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-input bg-muted p-0.5 outline-none transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-foreground data-checked:bg-foreground'>
            <SwitchPrimitive.Thumb className='block size-4.5 rounded-full bg-muted-foreground transition-transform duration-150 data-checked:translate-x-4 data-checked:bg-background' />
        </SwitchPrimitive.Root>
    );
}

export function Segmented<T extends string>({
    value,
    onChange,
    options,
    label,
    className,
}: {
    value: T;
    onChange: (value: T) => void;
    options: readonly { value: T; label: string }[];
    label: string;
    className?: string;
}) {
    return (
        <div
            role='group'
            aria-label={label}
            className={cn(
                'inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5',
                className,
            )}>
            {options.map((o) => (
                <button
                    key={o.value}
                    type='button'
                    aria-pressed={value === o.value}
                    onClick={() => onChange(o.value)}
                    className={cn(
                        'cursor-pointer rounded-md px-3 py-1.5 text-[12.5px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring',
                        value === o.value &&
                            'bg-primary text-primary-foreground hover:text-primary-foreground',
                    )}>
                    {o.label}
                </button>
            ))}
        </div>
    );
}

export function SelectField<T extends string>({
    id,
    value,
    onChange,
    options,
    label,
    className,
}: {
    id?: string;
    value: T;
    onChange: (value: T) => void;
    options: readonly { value: T; label: string }[];
    label: string;
    className?: string;
}) {
    return (
        <div className={cn('relative w-full sm:w-56', className)}>
            <select
                id={id}
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className='h-9 w-full cursor-pointer appearance-none rounded-lg border border-input bg-card pr-9 pl-3 text-[13px] text-foreground outline-none transition-colors duration-150 hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                aria-hidden
                className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
            />
        </div>
    );
}
