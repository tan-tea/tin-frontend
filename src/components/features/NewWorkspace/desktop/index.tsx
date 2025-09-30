'use client'

import type {
    FC,
} from 'react';

import {
    Box,
} from 'ui/index';

import { NewWorkspaceProps, } from 'feature/NewWorkspace';

type NewWorkspaceDesktopProps = NewWorkspaceProps;

const NewWorkspaceDesktop: FC<NewWorkspaceDesktopProps> = (
    props: NewWorkspaceDesktopProps
) => {
    const {
        t,
    } = props;

    return (
        <Box
            component='section'
            className='h-dvh-screen-mobile w-full overflow-hidden'
        >
            Map Desktop
        </Box>
    );
};

export default NewWorkspaceDesktop;
