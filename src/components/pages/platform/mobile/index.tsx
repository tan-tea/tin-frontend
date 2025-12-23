'use client'

import type { FC } from 'react';
import type { PlatformProps } from 'pages/platform';

import { Main } from 'ui/layout';
import { Paragraph } from 'ui/text';

import ApplicationLogo from 'common/application-logo';
import StoreCard from 'features/store/card';
import NavigationDrawer from 'features/navigation/drawer';

type PlatformMobileProps = PlatformProps;

const PlatformMobile: FC<PlatformMobileProps> = ({
    t,
    shops,
    workspace,
    multipleStores,
}) => {
    'use memo'

    return (
        <Main
            role='application'
            aria-label={t('metadata.siteName')}
            aria-description={t('metadata.description')}
            className='h-dvh'
        >
            <div className='size-full px-4 py-6'>
                <div className='h-full flex flex-col gap-y-4'>
                    <div className='ml-auto flex items-end justify-center'>
                        <NavigationDrawer/>
                    </div>
                    <div className='flex flex-col gap-y-2.5 text-center mb-12'>
                        <div className='h-12 relative'><ApplicationLogo/></div>
                    </div>
                    {shops && shops?.length > 0 && (
                        <div className='mt-auto flex flex-col gap-y-4'>
                            <Paragraph className='text-center font-bold'>
                                {t('selectHeadquarter')}
                            </Paragraph>
                            {shops.map(shop => (
                                <StoreCard key={shop.id} shop={shop}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
}

export default PlatformMobile;
