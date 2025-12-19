'use client'

import type { FC } from 'react';

import { Fragment } from 'react';

import { InternalLink } from 'ui/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    useBreadcrumbs,
} from 'ui/breadcrumb';

type Segment = {
    href: string;
    label: string;
    type?: 'link' | 'separator';
};

type NavigationBreadcrumbProps = {
    items?: Array<Segment>;
};

const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = ({ items }) => {
    'use memo'
    const breadcrumbs = useBreadcrumbs();

    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <Fragment key={breadcrumb.label}>
                            <BreadcrumbItem>
                                {breadcrumb.href && !isLast ? (
                                    <BreadcrumbLink asChild>
                                        <InternalLink href={breadcrumb.href}>
                                            {breadcrumb.label}
                                        </InternalLink>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator/>}
                        </Fragment>
                    );
                 })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default NavigationBreadcrumb;
