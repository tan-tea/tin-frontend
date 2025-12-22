'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';

import type { StoreBySlugProps } from 'pages/store-by-slug';

type StoreBySlugDesktopProps = StoreBySlugProps

const StoreBySlugDesktop: FC<StoreBySlugDesktopProps> = () => {
    'use memo'

    return (
        <Section>
            Hola
        </Section>
    );
}

export default StoreBySlugDesktop;
