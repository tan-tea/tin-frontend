'use client'

import type { ReactNode } from 'react';

import { useRef } from 'react';

import {
    loadCartAtom,
    loadCustomizationAtom,
    loadHistoryAtom,
    loadWorkspaceAtom,
    loadCategoryAtom,
    loadShopAtom,
} from 'shared/state';
import {
    useComputedStyle,
    useHydrateAndSyncAtom,
    useSyncLanguageWithRouter,
} from 'shared/hooks';

import { Section } from 'ui/layout';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';
import ThemeSwitcher from 'components/theme-switcher';
import LanguageSwitcher from 'components/language-switcher';

type Props = Readonly<{
    children: ReactNode;
    workspaceId: string;
}>;

export default function AuthLayout(props: Props) {
    'use memo'
    const { children } = props;

    useSyncLanguageWithRouter();

    useHydrateAndSyncAtom([
        [loadCartAtom, null],
        [loadHistoryAtom, []],
        [loadWorkspaceAtom, null],
        [loadCustomizationAtom, null],
        [loadCategoryAtom, null],
        [loadShopAtom, null],
    ] as any, false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const titlebarRef = useRef<HTMLDivElement | null>(null);

    const sectionStyle = useComputedStyle(sectionRef.current);
    const titlebarStyle = useComputedStyle(titlebarRef.current);

    const viewHeight = parseInt(sectionStyle?.height ?? '0');
    const contentSpacing = parseInt(titlebarStyle?.height ?? '0');

    return (
        <Section
            ref={sectionRef}
            aria-label={''}
            aria-description={''}
            className='overflow-hidden'
        >
            <Titlebar
                ref={titlebarRef}
                position='absolute'
                renderStart={() => (<div><BackButton/></div>)}
                renderEnd={() => <div className='ml-auto flex items-center gap-x-4'>
                    <ThemeSwitcher/>
                    <LanguageSwitcher/>
                </div>}
            />
            <div
                className='relative size-full px-4 py-4 flex flex-col'
                style={{ top: `${contentSpacing}px`, }}
            >
                {children}
            </div>
        </Section>
    );
}
