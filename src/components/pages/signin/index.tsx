'use client'

import { useTranslations } from 'next-intl';
import { createFormControl, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigation } from 'shared/hooks';

import { signinUserSchema, SigninUser } from './schemas';

import DeviceDetector from 'common/device-detector';

import SigninMobile from './mobile';
import SigninDesktop from './desktop';

type Props = Readonly<{ locale: string; }>;

export type SigninProps = Props & {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    formControl: Omit<UseFormReturn<SigninUser>, 'formState'>;
};

export default function Signin(props: Props) {
    'use memo'
    const { locale } = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const formControl = createFormControl<SigninUser>({
        resolver: zodResolver(signinUserSchema()),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const childProps: SigninProps = {
        t,
        locale,
        navigation,
        formControl,
    };

    return (
        <DeviceDetector
            MobileComponent={<SigninMobile {...childProps}/>}
            DesktopComponent={<SigninDesktop {...childProps}/>}
        />
    );
}
