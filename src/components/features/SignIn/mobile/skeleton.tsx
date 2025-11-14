'use client'

import type {
    FC
} from 'react';

import Skeleton from 'ui/skeleton'

const SignInMobileSkeleton: FC = () => <Skeleton
    rounded='sm'
    className='w-full h-dvh'
/>

export default SignInMobileSkeleton;
