'use client'

import { useState, type FC } from 'react';
import type { SigninProps } from 'pages/signin';
import type { SigninUser } from 'pages/signin/schemas';

import { toast } from 'sonner';
import {
    Controller,
    useForm,
    useFormState
} from 'react-hook-form';

import { signIn } from 'lib/auth-client';

import { Button } from 'ui/button';
import { Wrapper } from 'ui/layout';
import { InternalLink } from 'ui/link';
import { Heading, Paragraph } from 'ui/text';
import { Checkbox, CheckboxIndicator } from 'ui/checkbox';
import { Field, FieldControl, FieldDescription, FieldLabel } from 'ui/field';

type Props = SigninProps;

const SigninMobile: FC<Props> = ({
    t,
    formControl,
    navigation,
}) => {
    'use memo'
    const [loading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
    } = useForm({
        formControl,
    });

    const { isValid, errors, } = useFormState({
        control,
    });

    const onSubmit = async (form: SigninUser) => {
        setLoading(true);

        if (!isValid) {
            toast.error('Invalid form data');
            return;
        }

        await signIn.email({
            email: form.email,
            password: form.password,
            rememberMe: form.remember,
        }, {
            onSuccess: (ctx) => {
                setLoading(false);

                toast(`Bienvenido de nuevo ${ctx.data}!`);

                navigation.navigate('/');
            },
            onError: (ctx) => {
                setLoading(false);

                toast.error(ctx.error.message);
            },
        });
    }

    const disabled = !isValid || loading;

    return (
        <Wrapper className='mt-auto flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-2'>
                <Heading level='1'>Sign In</Heading>
                <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore atque voluptatum voluptates</Paragraph>
            </div>
            <form className='size-full flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field, }) => (
                        <Field {...field} variant='external'>
                            <FieldLabel>Email</FieldLabel>
                            <FieldControl
                                type='email'
                                placeholder='john.doe@mail.com'
                            />
                            {errors?.email && (
                                <FieldDescription>
                                    {errors?.email?.message}
                                </FieldDescription>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field, }) => (
                        <Field {...field} variant='external'>
                            <FieldLabel>Password</FieldLabel>
                            <FieldControl
                                type='password'
                                placeholder='Your strong password'
                            />
                            {errors?.password && (
                                <FieldDescription>
                                    {errors?.password?.message}
                                </FieldDescription>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='remember'
                    control={control}
                    render={({ field, }) => {
                        return (
                            <Field {...field} className='flex items-center gap-x-2'>
                                <Checkbox>
                                    <CheckboxIndicator/>
                                </Checkbox>
                                <Paragraph className='font-primary'>Remember Me</Paragraph>
                            </Field>
                        );
                    }}
                />
                <div>
                    <Button
                        type='submit'
                        color='primary'
                        variant='filled'
                        loading={loading}
                        disabled={disabled}
                    >
                        Sign In
                    </Button>
                </div>
            </form>
            <div className='text-center'>
                <Paragraph>
                    You don't have account? {' '}
                    <InternalLink
                        color='primary'
                        href={'/sign-up' as any}
                    >
                        Sign Up
                    </InternalLink>
                </Paragraph>
            </div>
        </Wrapper>
    );
}

export default SigninMobile;
