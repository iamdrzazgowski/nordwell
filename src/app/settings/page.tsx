import { AppShell } from '@/components/shared/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { SettingsView } from '@/features/settings/components/settings-view';
import { getCurrentPreferences } from '@/lib/auth-helpers';

export default async function SettingsPage() {
    const preferences = await getCurrentPreferences();

    return (
        <AppShell>
            <PageHeader eyebrow='Preferences' title='Settings' />
            <SettingsView initialPreferences={preferences} />
        </AppShell>
    );
}
