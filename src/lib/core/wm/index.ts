'use server'

import 'server-only';
import camelcaseKeys from 'camelcase-keys';

import type { Cache } from 'lib/core';
import {
    getCached,
    setCached,
} from 'lib/utils';
import { createClient } from 'lib/supabase/server';

import type {
    Workspace,
    Customization,
} from 'shared/models';

const workspaceCache = new Map<string, Cache<Workspace>>();
const customizationCache = new Map<string, Cache<Customization>>();

async function getCachedWorkspaceById(id: string): Promise<Workspace | null> {
    return getCached(workspaceCache, id);
}

async function setCachedWorkspaceById(id: string, data: Workspace): Promise<void> {
    return setCached(workspaceCache, id, data);
}

async function getWorkspaceById(id: string): Promise<Workspace> {
    const cached = await getCachedWorkspaceById(id);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('workspaces')
        .select(`
            *,
            shops ( * ),
            categories ( * ),
            segment:segments ( * )
        `)
        .eq('id', id)
        .single();

    if (error && !data) {
        console.error('error', error);
        throw new Error('Cannot get workspace id: ' + id);
    }

    const result = camelcaseKeys(data, { deep: true }) as Workspace;

    setCachedWorkspaceById(id, result);

    return result;
}

async function getCachedCustomizationByWorkspaceId(workspaceId: string): Promise<Customization | null> {
    return getCached(customizationCache, workspaceId);
}

async function setCachedCustomizationByWorkspaceId(workspaceId: string, data: Customization): Promise<void> {
    return setCached(customizationCache, workspaceId, data);
}

async function getCustomizationByWorkspaceId(workspaceId: string): Promise<Customization | null> {
    const cached = await getCachedCustomizationByWorkspaceId(workspaceId);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('customizations')
        .select(`
            *,
            colors:customization_colors (
                *,
                variants:customization_color_variants ( * )
            )
        `)
        .eq('workspace_id', workspaceId)
        .single();

    if (error && !data) return null;

    const result = camelcaseKeys(data, { deep: true }) as Customization;

    setCachedCustomizationByWorkspaceId(workspaceId, result);

    return result;
}

export {
    getWorkspaceById,
    getCachedWorkspaceById,
    getCustomizationByWorkspaceId,
    getCachedCustomizationByWorkspaceId,
};
