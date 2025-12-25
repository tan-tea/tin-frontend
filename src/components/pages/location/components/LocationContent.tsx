'use client'

import type { FC } from 'react';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { formatAddress } from 'lib/utils';

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
    ChevronDown,
    ChevronUp,
    Focus,
    ExternalLink,
} from 'components/icons';

import type {
    LocationProps,
} from 'pages/location';
import NavigationBreadcrumb from 'features/navigation/breadcrumb';

type Coords = {
    lat: number;
    lng: number;
};

type LocationContentProps = Pick<LocationProps, 'shops'> & {
    onFocusInMap: (coords: Coords) => void;
};

const LocationContent: FC<LocationContentProps> = ({
    shops,
    onFocusInMap,
}) => {
    'use memo'
    const t = useTranslations();

    const [open, setOpen] = useState<boolean>(false);

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
        // <div className='flex-1 size-full overflow-y-auto scrollbar-hide'>
        <div className='flex-1 flex flex-col'>
            <div className='flex-1 flex flex-col gap-y-4 p-4'>
                <NavigationBreadcrumb/>
                <Accordion>
                    {availableShops.map(shop => (
                        <AccordionItem key={shop?.id} onOpenChange={(o) => setOpen(o)}>
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
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default LocationContent;
