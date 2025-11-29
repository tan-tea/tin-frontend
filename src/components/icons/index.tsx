import type {
    FC,
    ElementType,
} from 'react';
import { LucideProps } from 'lucide-react';
import {
    tv,
    type ClassValue,
    type VariantProps
} from 'tailwind-variants';

import Es from './Es';
import En from './En';
import Blob from './Blob';
import Logo from './Logo';
import Discord from './Discord';
import Instagram from './Instagram';

const baseIcon = tv({
    base: 'size-6',
    variants: {
        color: {
            primary: '',
            secondary: '',
        },
        selected: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            selected: true,
            color: 'primary',
            className: 'text-[var(--mui-palette-primary-main)]',
        },
        {
            selected: true,
            color: 'secondary',
            className: 'text-[var(--mui-palette-secondary-main)]',
        }
    ],
    defaultVariants: {
        color: 'primary',
        selected: false,
    },
});

type BaseIconVariants = VariantProps<typeof baseIcon>;

type BaseIconProps = BaseIconVariants & {
    Icon: ElementType<LucideProps>;
    className?: ClassValue;
};

const BaseIcon: FC<BaseIconProps> = (
    props: BaseIconProps,
) => {
    const {
        Icon,
        className,
        color,
        selected,
        ...rest
    } = props;

    const iconProps: LucideProps = {
        className: baseIcon({
            color,
            selected,
            className,
        }),
        strokeWidth: 2,
        absoluteStrokeWidth: true,
    };

    return (
        <Icon {...iconProps} {...rest}/>
    );
};

export {
    Es,
    En,
    Blob,
    Logo,
    Discord,
    Instagram,
    BaseIcon,
};
export {
    Sun,
    Moon,
    Search,
    Monitor,
    Brush,
    SunMoon,
    MoveLeft,
    Paintbrush,
    ChevronUp,
    ChevronDown,
    House,
    Map,
    Heart,
    Bell,
    Languages,
    MessageCircleQuestion,
    Share,
    MapPin,
    ArrowLeft,
    ArrowRight,
    MonitorIcon,
    MoonStarIcon,
    SunIcon,
    X,
    List,
    Grid,
    Fullscreen,
} from 'lucide-react';
