'use client'

import { useTranslations } from 'next-intl';

import { Section } from 'ui/layout';

type ErrorProps = Readonly<object>;

export default function ErrorPage(props: ErrorProps) {
    const {} = props;

    const t = useTranslations();

    return (
        <Section
            aria-label=''
            aria-description=''
            className=''
        >
            <div>

            </div>
        </Section>
    );
};
