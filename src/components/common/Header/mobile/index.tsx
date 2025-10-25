'use client'

import {
    useState,
    type FC
} from 'react';

import {
    Box,
    AppBar,
    Dropdown,
} from 'ui/index';

import { HeaderProps } from 'common/Header';

import ThemeButton from 'common/ThemeButton';
import LanguageButton from 'common/LanguageButton';

const HeaderMobile: FC<HeaderProps> = (
    props: HeaderProps,
) => {
    const {
        shops,
        scrolling,
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const defaultShop = shops?.find?.(s => s?.isPrimary);

    return (
        <AppBar
            position='fixed'
            scrolling={scrolling}
            className='z-50 py-4 h-auto bg-dark rounded-b-2xl shadow-none dark:bg-dark-600'
        >
            <Box className='size-full flex items-center px-4'>
                {/* <UserAvatar/> */}
                <Box className='ml-auto flex items-center gap-x-3'>
                    <Dropdown
                        option={{
                            label: defaultShop?.name!,
                            value: defaultShop?.id!,
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

export default HeaderMobile;
