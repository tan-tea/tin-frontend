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

function getCachedWorkspaceById(id: string): Workspace | null {
    return getCached(workspaceCache, id);
}

function setCachedWorkspaceById(id: string, data: Workspace): void {
    return setCached(workspaceCache, id, data, 30);
}

async function getWorkspaceById(id: string): Promise<Workspace> {
    const cached = getCachedWorkspaceById(id);
    if (cached) return cached;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('workspaces')
        .select(`
            *,
            shops ( * ),
            categories ( * )
        `)
        .eq('id', id)
        .single();

    if (error && !data) throw new Error('Cannot get workspace id: ' + id);

    const result = camelcaseKeys(data, { deep: true }) as Workspace;

    setCachedWorkspaceById(id, result);

    return result;
}

function getCachedCustomizationByWorkspaceId(workspaceId: string): Customization | null {
    return getCached(customizationCache, workspaceId);
}

function setCachedCustomizationByWorkspaceId(workspaceId: string, data: Customization): void {
    return setCached(customizationCache, workspaceId, data, 60)
}

async function getCustomizationByWorkspaceId(workspaceId: string): Promise<Customization> {
    const cached = getCachedCustomizationByWorkspaceId(workspaceId);
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

    console.error(error);

    if (error && !data) throw new Error('Cannot get customization by workspace: ' + workspaceId);

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
