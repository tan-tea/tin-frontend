import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import Home from 'feature/Home';

export const metadata: Metadata = {
    title: 'Home',
};

type HomePageProps = object;

export default function HomePage(
    props: HomePageProps
): ReactElement<FC<HomePageProps>> {
    const {} = props;

    return (
        <Home/>
    );
};
