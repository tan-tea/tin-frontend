'use client'

import {
    FC,
    Ref,
    memo,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootTextField,
    TextFieldProps as RootTextFieldProps,
} from '@mui/material/TextField';

const textField = tv({
    slots: {
        root: 'bg-transparent',
        control: 'font-primary rounded-lg',
        input: 'pt-3 pb-2 px-4 text-white',
        info: 'text-sm font-primary text-gray-600',
    },
});

const {
    root,
    control,
    input,
    info,
} = textField();

type TextFieldVariants = VariantProps<typeof textField>;

type TextFieldProps = TextFieldVariants & {
    id?: string;
    className?: string;
    block?: boolean;
    isSelectable?: boolean;
    placeholder?: string;
    helperText?: string;
    autoFocus?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    name?: string;
    value?: unknown;
    required?: boolean;
    children?: RootTextFieldProps['children'];
    onBlur?: RootTextFieldProps['onBlur'];
    onKeyUp?: RootTextFieldProps['onKeyUp'];
    onChange?: RootTextFieldProps['onChange'];
    onKeyDown?: RootTextFieldProps['onKeyDown'];
};

const TextField: FC<TextFieldProps> = (props: TextFieldProps) => {
    const {
        id,
        onBlur,
        onChange,
        onKeyUp,
        onKeyDown,
        children,
        className,
        inputRef,
        name,
        value,
        required,
        block = false,
        placeholder = '',
        helperText = '',
        autoFocus = false,
        isSelectable = false,
    } = props;

    return (
        <RootTextField
            variant='outlined'
            className={root({
                className,
            })}
            size='medium'
            color='primary'
            id={id}
            name={name}
            value={value}
            children={children}
            required={required}
            inputRef={inputRef}
            fullWidth={block}
            autoFocus={autoFocus}
            select={isSelectable}
            placeholder={placeholder}
            helperText={helperText}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            slotProps={{
                formHelperText: { className: info(), },
                input: { className: control(), },
                htmlInput: { className: input(), },
            }}
        />
    );
};

export default memo(TextField);
