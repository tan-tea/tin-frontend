import type { FC, ElementType } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { LucideProps } from 'lucide-react';

import Es from './es';
import En from './en';
import Blob from './blob';
import Logo from './logo';
import Discord from './discord';

const baseIcon = tv({
    base: 'size-6',
    variants: {
        color: {
            primary: '',
            secondary: '',
        },
        selected: {
            true: 'text-[var(--mui-palette-primary-main)]',
            false: 'text-dark-600 dark:text-light-600',
        },
    },
    // compoundVariants: [
    //     {
    //         selected: true,
    //         color: 'primary',
    //         className: 'text-[var(--mui-palette-primary-main)]',
    //     },
    //     {
    //         selected: true,
    //         color: 'secondary',
    //         className: 'text-[var(--mui-palette-secondary-main)]',
    //     }
    // ],
    defaultVariants: {
        color: 'primary',
        selected: false,
    },
});

type IconVariants = VariantProps<typeof baseIcon>;

type IconProps = IconVariants & {
    value: ElementType<LucideProps>;
    className?: ClassValue;
};

const Icon: FC<IconProps> = ({
    value: BaseIcon,
    className,
    color,
    selected,
    ...props
}) => {
    'use memo'
    const iconProps: LucideProps = {
        className: baseIcon({
            className,
            // color,
            selected,
        }),
        strokeWidth: 2,
        absoluteStrokeWidth: true,
    };

    return (
        <BaseIcon {...props} {...iconProps}/>
    );
};

export {
    Es,
    En,
    Blob,
    Logo,
    Discord,
    Icon,
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
    User,
    ChevronUp,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    MoveRight,
    LandPlot,
    Plus,
    Minus,
    Focus,
    LayoutGrid,
    Menu,
    ExternalLink,
    Store,
    MoreHorizontal,
    Slash,
    Clock,
    ShoppingCart,
    Check,
    Trash,
    UserPlus,
} from 'lucide-react';
export {
    SiTiktok,
    SiFacebook,
    SiWhatsapp,
    SiInstagram,
    SiGooglemaps,
} from '@icons-pack/react-simple-icons';
