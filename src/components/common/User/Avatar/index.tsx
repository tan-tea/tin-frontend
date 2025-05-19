'use client'

import { secondsToMilliseconds, } from 'date-fns';
import {
    FC,
    useRef,
    useState,
    Fragment,
    MouseEvent,
    MouseEventHandler,
} from 'react';

import {
    Popper,
} from 'ui/index';

import { useDiscordUserQuery, } from 'shared/hooks/queries';

import UserAvatarButton from 'common/User/Avatar/Button';
import UserBasicInformationCard from 'common/User/BasicInformationCard';

type UserAvatarProps = object;

const UserAvatar: FC<UserAvatarProps> = (
    props: UserAvatarProps
) => {
    const {} = props;

    const popoverTimeoutRef = useRef<number | null>(null);

    const [anchorElement, setAnchorElement,] = useState<HTMLElement | null>(null);

    const {
        data: user,
    } = useDiscordUserQuery();

    const handleMouseEnter: MouseEventHandler = (
        event: MouseEvent<HTMLElement>,
    ) => {
        if (popoverTimeoutRef.current) return;

        const currentTarget = event.currentTarget;

        popoverTimeoutRef.current = window.setTimeout(() => {
            setAnchorElement(currentTarget);
        }, secondsToMilliseconds(1));
    };

    const handleMouseLeave: MouseEventHandler = () => {
        if (popoverTimeoutRef.current) {
            window.clearTimeout(popoverTimeoutRef.current);
            popoverTimeoutRef.current = null;
        }

        setAnchorElement(null);
    };

    const open = Boolean(anchorElement);

    return (
        <Fragment>
            <UserAvatarButton
                user={user}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
            />
            <Popper
                id='user-basic-information'
                open={open}
                anchorEl={anchorElement}
                placement='bottom-start'
                className='z-20'
            >
                <UserBasicInformationCard user={user}/>
            </Popper>
        </Fragment>
    );
}

export default UserAvatar;
