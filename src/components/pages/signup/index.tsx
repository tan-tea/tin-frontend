'use client'

import { useTranslations } from 'next-intl';
import { createFormControl, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupUserSchema, SignupUser } from './schemas';

import DeviceDetector from 'common/device-detector';

import SignupMobile from './mobile';
import SignupDesktop from './desktop';

type Props = Readonly<{ locale: string; }>;

export type SignupProps = Props & {
    t: ReturnType<typeof useTranslations>;
    formControl: Omit<UseFormReturn<SignupUser>, 'formState'>;
};

export default function Signup(props: Props) {
    'use memo'
    const { locale } = props;

    const t = useTranslations();

    const formControl = createFormControl<SignupUser>({
        resolver: zodResolver(signupUserSchema()),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            image: null,
        },
    });

    const childProps: SignupProps = {
        t,
        formControl,
        locale,
    };

    return (
        <DeviceDetector
            MobileComponent={<SignupMobile {...childProps}/>}
            DesktopComponent={<SignupDesktop {...childProps}/>}
        />
    );
}
