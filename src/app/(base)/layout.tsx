import {
    FC,
    Fragment,
    ReactNode,
    ReactElement,
} from 'react';

import { Box, } from 'ui/index';

import Header from 'common/Header';

type BaseLayoutProps = {
    children: ReactNode;
};

export default function BaseLayout(
    props: BaseLayoutProps
): ReactElement<FC<BaseLayoutProps>> {
    const {
        children,
    } = props;

    return (
        <Fragment>
            <Header/>
            <Box className='relative top-header-desktop'>
                {children}
            </Box>
        </Fragment>
    );
};
