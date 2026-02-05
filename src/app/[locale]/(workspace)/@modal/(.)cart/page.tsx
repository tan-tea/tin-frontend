import type { Metadata } from 'next';

import CartDrawer from 'features/cart/drawer';

type PageProps = Readonly<{
    params: Promise<{ locale: string; }>;
}>;

export async function generateMetadata(): Promise<Metadata> {
    return {};
}

export default async function Page(props: PageProps) {
    const { params } = props;

    const locale = (await params).locale;

    return (
        <CartDrawer locale={locale}/>
    );
}
