import type {
    FC,
    ReactNode
} from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { Link } from 'lib/i18n/navigation';

import {
    workspaceAtom,
    customizationAtom,
} from 'shared/state';
import { useNavigation } from 'shared/hooks';

import Skeleton from 'ui/skeleton';

import { ExternalLink } from 'ui/link';
import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuPortal,
    MenuTrigger,
    MenuPositioner,
    MenuGroup,
    MenuGroupLabel,
} from 'ui/menu';
import {
    House,
    SiInstagram,
    SiTiktok,
    SiWhatsapp,
    SiFacebook,
} from 'icons/index';

const LogoImage = dynamic(
    () => import('components/LogoImage'),
    {
        loading: () => <Skeleton rounded='md' className='h-[40px] w-[100px]'/>
    },
);

type Navigation = {
    href: string;
    disabled: boolean;
    icon: ReactNode;
    children: ReactNode;
};

type LogoProps = object;

const platformMap = {
    'whatsapp': SiWhatsapp,
    'tiktok': SiTiktok,
    'instagram': SiInstagram,
    'facebook': SiFacebook,
} as const;

const Logo: FC<LogoProps> = () => {
    'use memo'
    const t = useTranslations();

    const {
        isActivePath
    } = useNavigation();

    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom);

    const navigation: Array<Navigation> = [
        {
            href: '/',
            icon: <House/>,
            disabled: isActivePath('/'),
            children: t('goHome'),
        },
    ];

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
                        <MenuGroup>
                            <MenuGroupLabel>{t('navigation')}</MenuGroupLabel>
                            {navigation?.map?.(({
                                href,
                                icon,
                                disabled,
                                children,
                            }) => (
                                <MenuItem
                                    key={children?.toString()}
                                    disabled={disabled}
                                    render={<Link href={href}/>}
                                >
                                    {icon} {children}
                                </MenuItem>
                            ))}
                        </MenuGroup>
                        <MenuGroup>
                            <MenuGroupLabel>{t('socialMedia')}</MenuGroupLabel>
                            {customization?.socialMedia?.map?.(item => {
                                const Icon = item?.platform && item?.platform in platformMap
                                    ? platformMap?.[item.platform as keyof typeof platformMap]
                                    : House;

                                return (
                                    <MenuItem
                                        key={item?.url}
                                        closeOnClick={false}
                                        render={<ExternalLink
                                            href={item?.url}
                                            rel='noopener noreferrer'
                                            target='_blank'
                                        />}
                                    >
                                        <Icon className='text-dark-300 dark:text-light-600'/> {item?.label || item?.platform}
                                    </MenuItem>
                                );
                            })}
                        </MenuGroup>
                    </MenuPopup>
                </MenuPositioner>
            </MenuPortal>
        </Menu>
    );
};

export default Logo;
