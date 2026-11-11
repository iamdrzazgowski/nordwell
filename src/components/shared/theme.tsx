'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { getThemeAction } from '@/actions/settings.actions';
import { THEMES, type Theme } from '@/features/settings/types';

const STORAGE_KEY = 'nordwell-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Runs before first paint (inlined in <head>) so the saved theme is applied
 * without a light/dark flash. Keep it in sync with `applyTheme`.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t==='dark'||(t!=='light'&&window.matchMedia('${DARK_QUERY}').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

function readStoredTheme(): Theme | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && (THEMES as readonly string[]).includes(stored)) {
            return stored as Theme;
        }
    } catch {
        // Storage can be unavailable (private mode).
    }
    return null;
}

export function applyTheme(theme: Theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // The class below still applies for this page view.
    }
    const dark =
        theme === 'dark' ||
        (theme === 'system' && window.matchMedia(DARK_QUERY).matches);
    document.documentElement.classList.toggle('dark', dark);
}

/**
 * Mounted once in the root layout. Pulls the theme saved in the database on
 * a full page load, and again after navigation while nothing is stored locally
 * (first sign-in on a new device). Follows the OS setting live while the theme
 * is "system". Deliberately does not use the auth session hook, so it cannot
 * change what other components render during hydration.
 */
export function ThemeSync() {
    const pathname = usePathname();
    const loadedOnce = useRef(false);

    useEffect(() => {
        if (loadedOnce.current && readStoredTheme() !== null) return;
        loadedOnce.current = true;

        let cancelled = false;
        getThemeAction().then((theme) => {
            if (!cancelled && theme) applyTheme(theme);
        });
        return () => {
            cancelled = true;
        };
    }, [pathname]);

    useEffect(() => {
        const media = window.matchMedia(DARK_QUERY);
        const onChange = () => {
            if ((readStoredTheme() ?? 'system') === 'system') {
                applyTheme('system');
            }
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    return null;
}
