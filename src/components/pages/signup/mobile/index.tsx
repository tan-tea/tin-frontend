'use client'

import type { FC } from 'react';
import type { SignupProps } from 'pages/signup';
import type { SignupUser } from 'pages/signup/schemas';

import { toast } from 'sonner';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';

import { signUp } from 'lib/auth-client';

import { Button } from 'ui/button';
import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from 'ui/field';

type Props = SignupProps;

const SignupMobile: FC<Props> = ({
    t,
    formControl,
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

    const onSubmit = async (form: SignupUser) => {
        if (!isValid) {
            toast.error('Invalid form data');
            return;
        }

        const { data, error } = await signUp.email({
            name: form.name,
            email: form.email,
            password: form.password,
        }, {
            onSuccess: (ctx) => {},
            onError: (ctx) => {},
        });

        if (error) {
            toast.error(error.message);
        }
    }

    const disabled = !isValid;

    return (
        <Wrapper className='grow flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-2'>
                <Heading level='1'>Create an account</Heading>
                <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolore atque voluptatum voluptates</Paragraph>
            </div>
            <form className='size-full flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field, }) => (
                        <Field {...field} variant='external'>
                            <FieldLabel>Name</FieldLabel>
                            <FieldControl
                                type='text'
                                placeholder='John Doe'
                            />
                            {errors?.name && (
                                <FieldDescription>
                                    {errors?.name?.message}
                                </FieldDescription>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field, }) => (
                        <Field {...field} variant='external'>
                            <FieldLabel>Email</FieldLabel>
                            <FieldControl
                                type='email'
                                placeholder='john@mail.com'
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
                                placeholder='Strong password'
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
                    name='confirmPassword'
                    control={control}
                    render={({ field, }) => (
                        <Field {...field} variant='external'>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <FieldControl
                                type='password'
                                placeholder='Re-enter password'
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
                        Create account
                    </Button>
                </div>
            </form>
        </Wrapper>
    );
}

export default SignupMobile;
