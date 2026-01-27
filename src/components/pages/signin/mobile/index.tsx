'use client'

import type { FC } from 'react';
import type { SigninProps } from 'pages/signin';
import type { SigninUser } from 'pages/signin/schemas';

import { toast } from 'sonner';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';

import { signIn } from 'lib/auth-client';

import { Button } from 'ui/button';
import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from 'ui/field';

type Props = SigninProps;

const SigninMobile: FC<Props> = ({
    t,
    formControl,
    navigation,
}) => {
    'use memo'

    const {
        control,
        handleSubmit,
    } = useForm({
        formControl,
    });

    const { isValid, errors, } = useFormState({
        control,
    });

    const values = useWatch({
        control,
    });

    const onSubmit = async (form: SigninUser) => {
        if (!isValid) {
            toast.error('Invalid form data');
            return;
        }

        await signIn.email({
            email: form.email!,
            password: form.password!,
        }, {
            onSuccess: (ctx) => {
                navigation.navigate('/');
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        });
    }

    const disabled = !isValid;

    return (
        <Wrapper className='grow flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-2'>
                <Heading level='1'>Sign In</Heading>
                {/* <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore atque voluptatum voluptates</Paragraph> */}
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
                                placeholder='Type here'
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
                                placeholder='Type here'
                            />
                            {errors?.password && (
                                <FieldDescription>
                                    {errors?.password?.message}
                                </FieldDescription>
                            )}
                        </Field>
                    )}
                />
                <div className='mt-auto'>
                    <Button
                        type='submit'
                        color='primary'
                        variant='filled'
                        disabled={disabled}
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </Wrapper>
    );
}

export default SigninMobile;
