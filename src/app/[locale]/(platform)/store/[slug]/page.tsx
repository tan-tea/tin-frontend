import type { Metadata } from 'next';

type StoreBySlugPageProps = Readonly<{
    locale: string;
    slug: string;
}>;

export async function generateMetadata(props: StoreBySlugPageProps): Promise<Metadata> {
    return {}
}

export default function StoreBySlugPage(props: StoreBySlugPageProps) {
    return (
        <></>
    );
}
