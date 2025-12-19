import type {
    FC,
    ReactElement,
} from 'react';

import CategoryDetail from 'components/pages/category-detail';

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

    return (
        <CategoryDetail id={id}/>
    );
}
