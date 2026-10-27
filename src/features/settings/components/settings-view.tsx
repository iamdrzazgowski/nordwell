'use client';

import { useState } from 'react';

import { Bell, Database, Shield, SlidersHorizontal, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
    INITIAL_SETTINGS,
    SECTION_FIELDS,
    type SectionId,
    type Settings,
} from '../types';
import { DataSection } from './data-section';
import {
    isThresholdValid,
    NotificationsSection,
} from './notifications-section';
import { PreferencesSection } from './preferences-section';
import { isProfileValid, ProfileSection } from './profile-section';
import { SecuritySection } from './security-section';

const SECTIONS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data', icon: Database },
] as const satisfies readonly {
    id: SectionId;
    label: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[];

export function SettingsView() {
    const [saved, setSaved] = useState<Settings>(INITIAL_SETTINGS);
    const [draft, setDraft] = useState<Settings>(INITIAL_SETTINGS);
    const [active, setActive] = useState<SectionId>('profile');
    const [justSaved, setJustSaved] = useState(false);

    const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setJustSaved(false);
        setDraft((prev) => ({ ...prev, [key]: value }));
    };

    const isSectionDirty = (id: SectionId) =>
        SECTION_FIELDS[id].some((key) => draft[key] !== saved[key]);

    const dirty = SECTIONS.some((s) => isSectionDirty(s.id));

    const valid =
        isProfileValid(draft) &&
        (!draft.priceAlerts || isThresholdValid(draft.alertThreshold));

    const handleSave = () => {
        if (!valid) return;
        setSaved(draft);
        setJustSaved(true);
    };

    const handleDiscard = () => setDraft(saved);

    return (
        <div className='grid gap-8 lg:grid-cols-12 lg:gap-6'>
            <nav
                aria-label='Settings sections'
                className='-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 lg:col-span-3'>
                <ul className='flex gap-1 lg:sticky lg:top-6 lg:flex-col'>
                    {SECTIONS.map((s) => {
                        const Icon = s.icon;
                        const isActive = active === s.id;
                        return (
                            <li key={s.id} className='shrink-0'>
                                <button
                                    type='button'
                                    aria-current={isActive ? 'page' : undefined}
                                    onClick={() => setActive(s.id)}
                                    className={cn(
                                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring',
                                        isActive &&
                                            'bg-muted font-semibold text-foreground',
                                    )}>
                                    <Icon size={16} strokeWidth={1.75} />
                                    {s.label}
                                    {isSectionDirty(s.id) && (
                                        <>
                                            <span
                                                aria-hidden
                                                className='ml-auto size-1.5 rounded-full bg-foreground'
                                            />
                                            <span className='sr-only'>
                                                (unsaved changes)
                                            </span>
                                        </>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className='min-w-0 lg:col-span-9'>
                <div key={active} className='animate-in fade-in-0 duration-150'>
                    {active === 'profile' && (
                        <ProfileSection settings={draft} update={update} />
                    )}
                    {active === 'preferences' && (
                        <PreferencesSection settings={draft} update={update} />
                    )}
                    {active === 'notifications' && (
                        <NotificationsSection
                            settings={draft}
                            update={update}
                        />
                    )}
                    {active === 'security' && (
                        <SecuritySection settings={draft} update={update} />
                    )}
                    {active === 'data' && <DataSection />}
                </div>

                <div
                    className='sticky bottom-24 z-10 mt-6 md:bottom-6'
                    aria-live='polite'>
                    {(dirty || justSaved) && (
                        <div className='flex items-center justify-between gap-4 rounded-xl border border-border-strong bg-card px-4 py-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-150'>
                            {dirty ? (
                                <>
                                    <p className='text-[13px] text-muted-foreground'>
                                        {valid
                                            ? 'You have unsaved changes.'
                                            : 'Fix the highlighted fields to save.'}
                                    </p>
                                    <div className='flex shrink-0 items-center gap-2'>
                                        <Button
                                            variant='ghost'
                                            onClick={handleDiscard}>
                                            Discard
                                        </Button>
                                        <Button
                                            disabled={!valid}
                                            onClick={handleSave}>
                                            Save changes
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <p className='text-[13px] text-muted-foreground'>
                                    Settings saved.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
