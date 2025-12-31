'use client'

import type { FC, Ref, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import {
    useId,
    useImperativeHandle,
} from 'react';
import {
    $getRoot,
    $getSelection,
    type EditorThemeClasses,
} from 'lexical';
import { tv, cn } from 'tailwind-variants';

import { LexicalComposer, InitialConfigType, } from '@lexical/react/LexicalComposer';

const editor = tv({
    slots: {
        text: 'font-nunito',
    },
    variants: {
        size: {
            xs: {
                text: 'text-xs'
            },
            sm: {
                text: 'text-sm',
            },
            md: {
                text: 'text-base',
            },
            lg: {
                text: 'text-lg',
            },
            xl: {
                text: 'text-xl',
            },
            xxl: {
                text: 'text-2xl',
            },
        },
    },
    defaultVariants: {},
});

type EditorVariants = VariantProps<typeof editor>;

type EditorProps = ComponentProps<typeof LexicalComposer>
& Partial<InitialConfigType>
& EditorVariants
& {
    ref: Ref<{
        id: string;
        theme: EditorThemeClasses;
    }>
}

export const Editor: FC<EditorProps> = ({
    ref,
    namespace,
    ...props
}) => {
    'use memo'
    useImperativeHandle(ref, () => {
        return {
            id: uniqueId,
            theme,
        };
    });

    const uniqueId = useId();

    const { text } = editor();

    const theme: EditorThemeClasses = {
        heading: {
            h1: text({ size: 'xxl', className: 'font-bold' }),
            h2: text({ size: 'xl', className: 'font-bold' }),
            h3: text({ size: 'lg', className: 'font-bold' }),
            h4: text({ size: 'md', className: 'font-bold' }),
            h5: text({ size: 'sm', className: 'font-bold' }),
            h6: text({ size: 'xs', className: 'font-bold' }),
        },
        paragraph: text({ size: 'md' }),
        text: {
            base: text({ size: 'sm' }),
        },
    };

    const defaultConfig: InitialConfigType = {
        namespace: `editor-${uniqueId}`,
        theme,
        onError: () => {},
    };


    return (
        <LexicalComposer
            {...props}
            initialConfig={{
                ...defaultConfig,
                ...props.initialConfig,
            }}
        />
    )
}
