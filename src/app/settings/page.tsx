import { AppShell } from '@/components/shared/app-shell';
import { PageHeader } from '@/components/shared/page-header';
import { SettingsView } from '@/features/settings/components/settings-view';

export default function SettingsPage() {
    return (
        <AppShell>
            <PageHeader eyebrow='Preferences' title='Settings' />
            <SettingsView />
        </AppShell>
    );
}
