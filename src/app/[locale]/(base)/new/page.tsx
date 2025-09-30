import type {
    FC,
    ReactElement,
} from 'react';
import type { Metadata, } from 'next';

import NewWorkspace from 'feature/NewWorkspace';

export const metadata: Metadata = {
    title: 'New Workspace',
};

type NewPageProps = object;

export default function NewPage(
    props: NewPageProps
): ReactElement<FC<NewPageProps>> {
    const {} = props;

    return (
        <NewWorkspace/>
    );
};
