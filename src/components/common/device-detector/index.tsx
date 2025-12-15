'use client'

import type {
    FC,
    ReactElement,
} from 'react';

import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorProps = {
    MobileComponent: ReactElement;
    DesktopComponent: ReactElement;
};

const DeviceDetector: FC<DeviceDetectorProps> = ({
    MobileComponent,
    DesktopComponent,
}) => {
    'use memo'
    const isMobile = useMediaQuery({
        maxWidth: 768,
    });

    return isMobile ? MobileComponent : DesktopComponent;
}

export default DeviceDetector;
