'use client'

import type { FC } from 'react';
import type { PrivacyProps } from 'pages/privacy';

import { format } from 'date-fns';

import { RichText } from 'ui/text';
import { Section } from 'ui/layout';

type Props = Readonly<PrivacyProps>;

const PrivacyMobile: FC<Props> = ({
    t,
    workspace,
}) => {
    'use memo'

    return (
        <Section
            aria-label={t('metadata.privacy.title')}
            aria-description={t('metadata.privacy.description')}
            className='h-full md:scrollbar-default'
        >
            <div className='size-full p-4 flex flex-col gap-y-4 md:max-w-4xl md:mx-auto'>
                <RichText>
                    {(tags) => t.rich('Privacy.content', {
                        ...tags,
                        lastUpdate: format(new Date(workspace.createdAt), 'dd/MM/yyyy'),
                        workspace: workspace.name,
                    })}
                </RichText>
            </div>
        </Section>
    );
}

export default PrivacyMobile;
