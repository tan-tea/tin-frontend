'use client'

import {
    useState,
    type FC,
    type ReactElement,
} from 'react';
import { useAtomValue } from 'jotai';

import { useScroll } from 'shared/hooks';
import { hydratedWorkspaceAtom } from 'shared/state/wm';

import {
    Box,
    AppBar,
    Dropdown,
} from 'ui/index';

import UserAvatar from 'common/User/Avatar';
import ThemeButton from 'common/Header/ThemeButton';
import SearchButton from 'common/Header/SearchButton';
import LanguageButton from 'common/Header/LanguageButton';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

type OwnHeaderProps = object;

export type HeaderProps = {
    scrolling: boolean;
    shops: Array<any>;
};

const HeaderMobile: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {
        shops,
        scrolling,
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const defaultShop = shops?.find?.(s => s?.is_primary);

    return (
        <AppBar
            position='fixed'
            scrolling={scrolling}
            className='z-50 h-header-mobile bg-dark rounded-b-2xl shadow-none dark:bg-dark-600'
        >
            <Box className='size-full flex items-center px-4'>
                {/* <UserAvatar/> */}
                <Box className='ml-auto flex items-center gap-x-3'>
                    <Dropdown
                        option={{
                            label: defaultShop?.name,
                            value: defaultShop?.id,
                        }}
                        options={shops?.map(s => ({
                            label: s?.name,
                            value: s?.id,
                        }))}
                        open={open}
                        onOpenChange={(open) => setOpen(open)}
                        onSelectOption={(option) => console.log('selected', option)}
                    />
                    <ThemeButton/>
                    <LanguageButton/>
                </Box>
            </Box>
        </AppBar>
    );
}

const HeaderDesktop: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {} = props;

    return (
        <AppBar
            position='fixed'
            className='z-10 h-header-desktop bg-white shadow-none dark:bg-dark-600'
        >
            <Box className='size-full flex items-center px-20'>
                <Box
                    component='nav'
                    aria-label='navigation'
                    className='ml-auto h-full flex items-center gap-x-4'
                >
                    <SearchButton/>
                    <ThemeButton/>
                    <UserAvatar/>
                </Box>
            </Box>
        </AppBar>
    );
};

export default function Header(
    props: OwnHeaderProps,
): ReactElement<FC<OwnHeaderProps>> {
    const {} = props;

    const {
        moving,
    } = useScroll();

    const workspace = useAtomValue(hydratedWorkspaceAtom);

    const childProps: HeaderProps = {
        scrolling: moving,
        shops: workspace?.shops || [],
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderDesktop {...childProps}/>}
        />
    );
};
