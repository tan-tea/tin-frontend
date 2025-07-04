'use client'

import {
    FC,
    memo,
    Fragment,
    ReactNode,
    ReactElement,
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorLayoutProps = {
    MobileComponent: Required<ReactNode>;
    DesktopComponent: Required<ReactNode>;
};

export default memo<DeviceDetectorLayoutProps>(
    function DeviceDetectorLayout(
        props: DeviceDetectorLayoutProps
    ): ReactElement<FC<DeviceDetectorLayoutProps>> {
        const {
            MobileComponent,
            DesktopComponent,
        } = props;

        const isMobile = useMediaQuery({
            maxWidth: '768px',
        });

        const isDesktop = !isMobile;

        return (
            <Fragment>
                {isMobile && MobileComponent}
                {isDesktop && DesktopComponent}
            </Fragment>
        );
    }
);
