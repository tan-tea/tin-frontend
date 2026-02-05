'use client';

import type { FC } from 'react';

import { getValueInitials } from 'lib/utils';
import { signOut, useSession } from 'lib/auth-client';

import { Button } from 'ui/button';
import { InternalLink } from 'ui/link';
import { Heading, Paragraph } from 'ui/text';
import { AvatarFallback, AvatarRoot } from 'ui/avatar';

type Props = Readonly<object>;

const UserCard: FC<Props> = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className='p-4 mb-2 flex flex-col gap-y-1.5'>
                <p className='text-sm font-medium'>Bienvenido 👋</p>
                <InternalLink
                    href={'/sign-in' as any}
                    className='w-full text-[var(--mui-palette-primary-main)]'
                >
                    Iniciar sesión
                </InternalLink>
            </div>
        );
    }

    return (
        <div className='p-4 space-y-3 mb-2'>
            <div className='flex items-center gap-3'>
                <AvatarRoot
                    size='xl'
                    rounded='full'
                    className='border'
                >
                    <AvatarFallback>
                        {getValueInitials(session.user?.name)}
                    </AvatarFallback>
                </AvatarRoot>
                <div>
                    <Heading level='3'>{session.user?.name}</Heading>
                    <Paragraph level='4'>{session.user?.email}</Paragraph>
                </div>
            </div>
            <Button
                size='sm'
                variant='outline'
                onClick={() => signOut()}
            >
                Cerrar sesión
            </Button>
        </div>
    );
}

export default UserCard;
