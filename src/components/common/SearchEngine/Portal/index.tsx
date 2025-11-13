'use client'

import {
    useId,
    type FC,
    type ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';

import Box from 'ui/box';

const searchEnginePortal = tv({
    slots: {
        portal: 'size-full p-4',
    },
    variants: {},
    defaultVariants: {},
});

type SearchEnginePortalVariants = VariantProps<typeof searchEnginePortal>;

type SearchEnginePortalProps = SearchEnginePortalVariants & Pick<ComponentProps<'div'>, 'style'> & {
};

const SearchEnginePortal: FC<SearchEnginePortalProps> = (props) => {
    'use memo'
    const {
        style,
    } = props;

    const {
        portal,
    } = searchEnginePortal();

    const portalId = useId();

    return (
        <Box
            id={portalId}
            className={portal()}
        >
            Hola
        </Box>
    );
};

export default SearchEnginePortal;
