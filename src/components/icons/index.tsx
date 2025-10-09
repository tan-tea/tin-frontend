import type { ElementType, FC, } from 'react';
import { LucideProps } from 'lucide-react';

import Es from './Es';
import En from './En';
import Blob from './Blob';
import Logo from './Logo';
import Discord from './Discord';
import Instagram from './Instagram';

type BaseIconProps = {
    Icon: ElementType<LucideProps>;
    className?: string;
};

const BaseIcon: FC<BaseIconProps> = (
    props: BaseIconProps,
) => {
    const {
        Icon,
        className,
        ...rest
    } = props;

    const iconProps: LucideProps = {
        className: `size-6`,
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
} from 'lucide-react';
