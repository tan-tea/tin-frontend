'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import Image from 'next/image';

import { tv } from 'tailwind-variants';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import {
    workspaceAtom,
    customizationAtom,
} from 'shared/state';

const logo = tv({
    base: 'object-contain box-border outline-none',
    variants: {
        size: {
            sm: 'h-12',
            md: 'h-16',
            lg: 'h-24',
            full: 'size-full',
        },
    },
    defaultVariants: {},
});

type LogoVariants = VariantProps<typeof logo>;

type ApplicationLogoProps = LogoVariants;

type LoadingCompleteHandler = ComponentProps<typeof Image>['onLoad'];

const ApplicationLogo: FC<ApplicationLogoProps> = ({
    size,
}) => {
    'use memo'

    const t = useTranslations();

    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom);

    const handleLoadComplete: LoadingCompleteHandler = (image) => {};

    const src = customization?.logo ?? workspace?.logo ?? '/images/blank.svg';
    const alt = workspace?.name ?? workspace?.description ?? t('metadata.siteName');

    return (
        <Image
            fill
            preload
            loading='eager'
            quality={100}
            src={src}
            alt={alt}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={logo({
                size,
            })}
            onLoad={handleLoadComplete}
        />
    );
}

export default ApplicationLogo
