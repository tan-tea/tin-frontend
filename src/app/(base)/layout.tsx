import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';

import BaseLayout from 'layout/BaseLayout';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout(
    props: LayoutProps
): ReactElement<FC<LayoutProps>> {
    const {
        children,
    } = props;

    return (
        <BaseLayout children={children}/>
    );
};
