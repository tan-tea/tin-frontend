'use client'

import {
    useId,
    type FC,
    type ComponentProps,
    useImperativeHandle,
    Ref,
} from 'react';
import {
    $getRoot,
    $getSelection,
    type EditorThemeClasses,
} from 'lexical';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';

import { LexicalComposer, InitialConfigType, } from '@lexical/react/LexicalComposer';

import { cn } from 'lib/utils';

const editor = tv({
    slots: {
        text: 'font-nunito',
    },
    variants: {
        size: {
            // h6
            xs: {
                text: 'text-xs'
            },
            // h5
            sm: {
                text: 'text-sm',
            },
            // h4
            md: {
                text: 'text-base',
            },
            // h3
            lg: {
                text: 'text-lg',
            },
            // h2
            xl: {
                text: 'text-xl',
            },
            // h1
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
