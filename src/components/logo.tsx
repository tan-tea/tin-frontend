'use client'

import type { FC, ReactNode } from 'react';

import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { Link } from 'lib/i18n/navigation';

import { customizationAtom } from 'shared/state';
import { useNavigation } from 'shared/hooks';

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
} from 'components/icons';

const ApplicationLogo = dynamic(
    () => import('common/application-logo'),
    {
        ssr: false,
    },
);

type Navigation = {
    href: string;
    disabled: boolean;
    icon: ReactNode;
    children: ReactNode;
};

type Props = Readonly<object>;

const platformMap = {
    'whatsapp': SiWhatsapp,
    'tiktok': SiTiktok,
    'instagram': SiInstagram,
    'facebook': SiFacebook,
} as const;

const Logo: FC<Props> = () => {
    'use memo'
    const t = useTranslations();

    const {
        isActivePath
    } = useNavigation();

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
            <MenuTrigger className='w-full relative h-10'>
                <ApplicationLogo/>
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
                                    render={<Link href={href as any}/>}
                                >
                                    {icon} {children}
                                </MenuItem>
                            ))}
                        </MenuGroup>
                        <MenuGroup>
                            <MenuGroupLabel>{t('socialMedia')}</MenuGroupLabel>
                            {customization?.socialMedia?.map?.(item => {
                                const Platform = (item?.platform && item?.platform in platformMap)
                                    ? platformMap?.[item.platform as keyof typeof platformMap]
                                    : House;

                                return (
                                    <MenuItem
                                        key={item?.url}
                                        closeOnClick={false}
                                        render={<ExternalLink
                                            href={item?.url as any}
                                            rel='noopener noreferrer'
                                            target='_blank'
                                        />}
                                    >
                                        <Platform className='text-dark-300 dark:text-light-600'/> {item?.label || item?.platform}
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
