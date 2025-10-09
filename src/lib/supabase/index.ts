import { cookies, } from 'next/headers';
import {
    createServerClient,
} from '@supabase/ssr';

import {
    SUPABASE_URL,
    SUPABASE_KEY,
} from 'lib/supabase/constants';

// async function createSSRClient(): Promise<ReturnType<typeof createServerClient>> {
async function createSSRClient() {
    const cookieStore = await cookies();

    return createServerClient(
        SUPABASE_URL!,
        SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({
                            name,
                            value,
                            options
                        }) => cookieStore.set(name, value, options))
                    } catch {}
                },
            },
        },
    );
}

export {
    createSSRClient,
};
