'use client'

import { createBrowserClient } from '@supabase/ssr';

import {
    SUPABASE_URL,
    SUPABASE_KEY,
} from 'lib/supabase/constants';

export function createClient() {
    return createBrowserClient(
        SUPABASE_URL!,
        SUPABASE_KEY!,
        {
            isSingleton: true,
        }
    );
}
