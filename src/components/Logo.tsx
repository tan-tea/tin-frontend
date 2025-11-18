import type {
    FC
} from 'react';
import { useAtomValue } from 'jotai';

import dynamic from 'next/dynamic';

import {
    workspaceAtom,
    customizationAtom,
} from 'shared/state';

import Skeleton from 'ui/skeleton';
import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuPortal,
    MenuTrigger,
    MenuPositioner,
} from 'ui/menu';

const LogoImage = dynamic(
    () => import('components/LogoImage'),
    {
        loading: () => <Skeleton rounded='md' className='h-[40px] w-[100px]'/>
    },
);

const Logo: FC = () => {
    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom);

    return (
        <Menu>
            <MenuTrigger>
                <LogoImage
                    src={(customization?.logo || workspace?.logo)!}
                    alt={workspace?.name!}
                />
            </MenuTrigger>
            <MenuPortal>
                <MenuPositioner>
                    <MenuPopup>
                        {customization?.socialMedia?.map?.(item => (
                            <MenuItem
                                key={item?.url}
                                closeOnClick={false}
                                render={<a
                                    href={item?.url}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                />}
                            >
                                {item?.label || item?.platform}
                            </MenuItem>
                        ))}
                    </MenuPopup>
                </MenuPositioner>
            </MenuPortal>
        </Menu>
    );
};

export default Logo;
