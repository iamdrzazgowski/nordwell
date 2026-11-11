'use client';

import { useState } from 'react';

import { ChangePasswordDialog } from './change-password-dialog';
import { SettingRow, SettingsSection } from './setting-row';

export function SecuritySection() {
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    return (
        <SettingsSection
            eyebrow='Access'
            title='Security'
            description='Protect your account and the data in it.'>
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
    );
}
