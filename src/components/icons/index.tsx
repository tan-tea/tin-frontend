import type { ElementType, FC, } from 'react';
import { LucideProps } from 'lucide-react';

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
    ChevronDown,
    House,
    Map,
    Heart,
    Bell,
    Languages,
} from 'lucide-react';
