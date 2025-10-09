'use client'

import type {
    ReactElement,
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorLayoutProps = {
    MobileComponent: ReactElement;
    DesktopComponent: ReactElement;
};

export default function DeviceDetectorLayout(
    props: DeviceDetectorLayoutProps
): ReactElement {
    const {
        MobileComponent,
        DesktopComponent,
    } = props;

    const isMobile = useMediaQuery({
        maxWidth: 768,
    });

    return isMobile ? MobileComponent : DesktopComponent;
}
