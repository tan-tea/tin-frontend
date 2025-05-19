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
    mobileComponent: Required<ReactNode>;
    desktopComponent: Required<ReactNode>;
};

export default memo<DeviceDetectorLayoutProps>(
    function DeviceDetectorLayout(
        props: DeviceDetectorLayoutProps
    ): ReactElement<FC<DeviceDetectorLayoutProps>> {
        const {
            mobileComponent,
            desktopComponent,
        } = props;

        const isMobile = useMediaQuery({
            maxWidth: '768px',
        });

        const isDesktop = !isMobile;

        return (
            <Fragment>
                {isMobile && mobileComponent}
                {isDesktop && desktopComponent}
            </Fragment>
        );
    }
);
