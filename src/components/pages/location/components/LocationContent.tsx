'use client'

import type {
    FC,
} from 'react';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { formatAddress } from 'lib/utils';

import {
    Box,
    Typography,
    IconButton,
} from 'ui/index';
import { Heading } from 'ui/text';
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
} from 'icons/index';

import type {
    LocationProps,
} from 'components/pages/location';
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

    const handleFocusInMap = (coords: Coords) => {
        if (onFocusInMap) onFocusInMap(coords);
    };

    const navigateToGoogleMaps = (coords: Coords) => {
        const searchParams = new URLSearchParams({
            q: `${coords.lat}, ${coords.lng}`,
        });

        const url = new URL('https://www.google.com/maps?' + searchParams.toString());

        window.open(url, '_blank');
    }

    return (
        <Box className='flex-1 size-full overflow-y-auto scrollbar-hide'>
            <Box className='size-full flex flex-col gap-y-4 p-4'>
                <NavigationBreadcrumb/>
                {/* <Heading level='1'>
                    {t('location.heading')}
                </Heading> */}
                <Accordion>
                    {shops.map(shop => (
                        <AccordionItem key={shop?.id} onOpenChange={(o) => setOpen(o)}>
                            <AccordionHeader>
                                <AccordionTrigger>
                                    <Box className='flex flex-col'>
                                        {shop?.isPrimary && (
                                            <Typography variant='body1' className='text-start text-sm'>
                                                Sede principal
                                            </Typography>
                                        )}
                                        <Heading color='primary' level='3'>
                                            {shop?.name}
                                        </Heading>
                                    </Box>
                                    {open
                                        ? <Icon value={ChevronUp}/>
                                        : <Icon value={ChevronDown}/>
                                    }
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionPanel>
                                <Box className='flex flex-col gap-y-1'>
                                    <Heading level='4'>{t('address')}</Heading>
                                    <Typography className='text-sm font-normal'>
                                        {formatAddress(shop?.address)}
                                    </Typography>
                                </Box>
                                <Box className='mt-4 flex justify-end gap-x-4'>
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
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
        </Box>
    );
}

export default LocationContent;
