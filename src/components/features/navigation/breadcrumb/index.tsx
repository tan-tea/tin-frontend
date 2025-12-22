'use client'

import type { FC } from 'react';

import { Fragment } from 'react';

import { useBreadcrumb } from 'shared/contexts/breadcrumb';

import { InternalLink } from 'ui/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from 'ui/breadcrumb';

type NavigationBreadcrumbProps = Readonly<object>;

const NavigationBreadcrumb: FC<NavigationBreadcrumbProps> = () => {
    'use memo'
    const { breadcrumbs } = useBreadcrumb();

    console.log('breadcrumbs', breadcrumbs);

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
                                        <InternalLink href={breadcrumb.href as any}>
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
