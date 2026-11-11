'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
    getPreferences,
    updatePreferences,
} from '@/lib/repositories/settings.repository';
import { CURRENCIES, THEMES, type Theme } from '@/features/settings/types';

const preferencesSchema = z.object({
    currency: z.enum(CURRENCIES),
    theme: z.enum(THEMES),
});

/** Saved theme of the signed-in user, or null when signed out. */
export async function getThemeAction(): Promise<Theme | null> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;
    return (await getPreferences(session.user.id)).theme;
}

type UpdatePreferencesState = { success: boolean; error?: string };

export async function updatePreferencesAction(
    input: z.input<typeof preferencesSchema>,
): Promise<UpdatePreferencesState> {
    const parsed = preferencesSchema.safeParse(input);
    if (!parsed.success) {
        return { success: false, error: 'Invalid preferences' };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await updatePreferences(session.user.id, parsed.data);
    } catch (error) {
        console.error('Failed to update preferences:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to save preferences',
        };
    }

    revalidatePath('/', 'layout');
    return { success: true };
}
