'use client';

import type { FC, JSX } from 'react';

import {
    useState,
    useEffect,
} from 'react';
import { tv, cn } from 'tailwind-variants';
import { motion } from 'motion/react';

const switcher = tv({});

type SwitcherOption = {
    icon: JSX.Element;
    value: any;
}

type SwitcherOptionProps = SwitcherOption & {
    isActive?: boolean;
    onClick?: (value: any) => void;
}

const SwitcherOption: FC<SwitcherOptionProps> = ({
    icon,
    value,
    isActive,
    onClick,
}) => {
    'use memo'

    return (
        <button
            className={cn(
                'relative flex size-8 cursor-default items-center justify-center rounded-full transition-all [&_svg]:size-4',
                isActive
                    ? 'text-[var(--mui-palette-primary-main)]'
                    : 'text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50',
            )}
            role='radio'
            aria-checked={isActive}
            aria-label={`Switch to ${value}`}
            onClick={() => onClick && onClick(value)}
        >
            {icon}
            {isActive && (
                <motion.div
                    layoutId='theme-option'
                    transition={{
                        type: 'spring',
                        bounce: 0.3,
                        duration: 0.6
                    }}
                    className='absolute inset-0 rounded-full border border-[var(--mui-palette-primary-main)]'
                />
            )}
        </button>
    );
}

type SwitcherProps = {
    current: any;
    setCurrent: (value: any) => void;
    options: Array<SwitcherOption>;
}

const Switcher: FC<SwitcherProps> = ({
    current,
    options,
    setCurrent,
}) => {
    'use memo'
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className='flex h-7 w-24'/>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='inline-flex items-center overflow-hidden rounded-full bg-white ring-1 ring-light-400 ring-inset dark:bg-dark-600 dark:ring-dark-400'
            role='radiogroup'
        >
            {options?.map?.((option) => {
                return (
                    <SwitcherOption
                        key={option.value}
                        icon={option.icon}
                        value={option.value}
                        isActive={current == option?.value}
                        onClick={() => setCurrent(option.value)}
                    />
                )
            }
            )}
        </motion.div>
    );
}

export type { SwitcherOption };
export default Switcher;
