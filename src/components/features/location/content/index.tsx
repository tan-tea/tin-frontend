'use client'

import type { FC } from 'react';

import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { formatAddress } from 'lib/utils';

import { shopsAtom } from 'shared/state';

import { IconButton } from 'ui/index';
import { Heading, Paragraph } from 'ui/text';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionPanel,
} from 'ui/accordion';
import {
    Icon,
    Focus,
    ChevronDown,
    ChevronUp,
    ExternalLink,
} from 'components/icons';

import NavigationBreadcrumb from 'features/navigation/breadcrumb';

type Coords = {
    lat: number;
    lng: number;
};

type Props = Readonly<{
    onFocusInMap: (coords: Coords) => void;
}>;

const LocationContent: FC<Props> = ({
    onFocusInMap,
}) => {
    'use memo'
    const t = useTranslations();

    const shops = useAtomValue(shopsAtom);

    const [values, setValues] = useState<Array<string>>(shops.map(s => s.id));

    const availableShops = useMemo<typeof shops>(
        () => (shops ?? [])
            .filter(shop => shop.address && shop.geolocation),
        [shops],
    );

    const handleFocusInMap = (coords: Coords) => {
        if (onFocusInMap) onFocusInMap(coords);
    };

    // TODO: use google maps url as ENV VAR
    const navigateToGoogleMaps = (coords: Coords) => {
        const searchParams = new URLSearchParams({
            q: `${coords.lat}, ${coords.lng}`,
        });

        const url = new URL('https://www.google.com/maps?' + searchParams.toString());

        window.open(url, '_blank');
    }

    return (
        <div className='flex-1 flex flex-col'>
            <div className='flex-1 flex flex-col gap-y-4 p-4'>
                <NavigationBreadcrumb/>
                <Accordion
                    multiple
                    value={values}
                    onValueChange={(value) => setValues(value)}
                    className='flex flex-col gap-y-4'
                >
                    {availableShops.map(shop => {
                        if (!shop) return null;

                        const open = values.includes(shop.id);

                        return (
                            <AccordionItem key={shop.id} value={shop?.id}>
                                <AccordionHeader>
                                    <AccordionTrigger>
                                        <div className='flex flex-col text-start'>
                                            {shop?.isPrimary && (
                                                <Heading level='4' className='font-normal'>
                                                    {t('headquarter')}
                                                </Heading>
                                            )}
                                            <Heading color='primary' level='3'>
                                                {shop?.name}
                                            </Heading>
                                        </div>
                                        {open
                                            ? <Icon value={ChevronUp}/>
                                            : <Icon value={ChevronDown}/>
                                        }
                                    </AccordionTrigger>
                                </AccordionHeader>
                                <AccordionPanel>
                                    <div className='flex flex-col gap-y-1'>
                                        <Heading level='4'>{t('address')}</Heading>
                                        <Paragraph>
                                            {formatAddress(shop?.address)}
                                        </Paragraph>
                                    </div>
                                    <div className='mt-4 flex justify-end gap-x-4'>
                                        <IconButton
                                            icon={Focus}
                                            rounded='full'
                                            onClick={() => handleFocusInMap({
                                                lat: shop.geolocation.latitude,
                                                lng: shop.geolocation.longitude,
                                            })}
                                        />
                                        <IconButton
                                            icon={ExternalLink}
                                            rounded='full'
                                            onClick={() => navigateToGoogleMaps({
                                                lat: shop.geolocation.latitude,
                                                lng: shop.geolocation.longitude,
                                            })}
                                        />
                                    </div>
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
}

export default LocationContent;
