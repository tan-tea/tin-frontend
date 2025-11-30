import type {
    FC,
    ReactElement,
} from 'react';

import CategoryDetail from 'feature/CategoryDetail';

type CategoryDetailPageProps = {
    params: Promise<{
        id: string;
        locale: string;
    }>;
};

export default async function CategoryDetailPage(
    props: CategoryDetailPageProps
): Promise<ReactElement<FC<CategoryDetailPageProps>>> {
    const { params } = props;

    const { id } = await params;

    console.log('category id', id);

    return (
        <CategoryDetail id={id}/>
    );
}
