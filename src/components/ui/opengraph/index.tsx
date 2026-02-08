import type { FC, ReactNode, ComponentProps } from 'react';

type ContainerProps = Readonly<{
    children: ReactNode;
    style?: ComponentProps<'div'>['style'];
}>;

const Container: FC<ContainerProps> = ({
    children,
    style,
}) => {
    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                fontFamily: 'Poppins',
                ...style
            }}
        >
            {children}
        </div>
    );
}

type OverlayProps = Readonly<object>;

const Overlay: FC<OverlayProps> = () => {
    return (
        <div
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1,
            }}
        />
    );
}

type WrapperProps = Readonly<ComponentProps<'div'>>;

const Wrapper: FC<WrapperProps> = ({
    children,
    style,
}) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                ...style,
            }}
        >
            {children}
        </div>
    )
}

export {
    Container,
    Overlay,
    Wrapper,
};
