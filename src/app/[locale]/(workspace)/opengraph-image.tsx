import { cache } from 'react';
import { join } from 'node:path';
import { promises } from 'node:fs';
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { clientEnv } from 'env/client';
import { getAllCustomizationByWorkspace } from 'app/actions';

import {
    Container,
    Overlay,
    Wrapper,
} from 'ui/opengraph';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

const readFont = cache(
    async (fontName: string) => await promises.readFile(
        join(process.cwd(), 'fonts', fontName)
    ),
);

const readAllFonts = cache(
    async (fontNames: Array<string>) => {
        const fonts = fontNames
            .filter(Boolean)
            .map(font => ({
                id: font.trim().toLowerCase(),
                name: font,
            }))

        const data = await Promise.allSettled(
            fonts.filter(f => f.id !== 'poppins').map(
                async (f) => ({
                    name: f.name,
                    data: await readFont(`${f.id}.ttf`)
                }),
            ),
        );

        return data
            .filter(d => d.status === 'fulfilled')
            .map(d => d.value);
    },
);

const cachedGetAllCustomizationByWorkspace = cache(getAllCustomizationByWorkspace);

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image(props: Props) {
    const { params } = props;

    const locale = (await params).locale;

    const t = await getTranslations({
        locale,
        namespace: 'metadata',
    });

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;

    const poppins = await readFont('poppins.ttf');

    const customization = await cachedGetAllCustomizationByWorkspace(workspaceId);
    if (!customization) return new ImageResponse(
        (
            <Container>
                <Overlay/>
                <Wrapper>
                    <div
                        style={{
                            fontSize: 56,
                            fontFamily: 'Poppins',
                            fontWeight: '700',
                            marginBottom: '16px',
                        }}
                    >
                        {t('applicationName')}
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            maxWidth: '780px',
                        }}
                    >
                        {t('description')}
                    </div>
                </Wrapper>
            </Container>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Poppins',
                    data: poppins,
                },
            ],
        }
    )

    const primaryFont = customization.fontPrimary;
    const secondaryFont = customization.fontSecondary;

    const fontsData = await readAllFonts([primaryFont, secondaryFont]);

    return new ImageResponse(
        (
            <Container
                style={{
                    fontFamily: primaryFont,
                }}
            >
                {t('siteName')}
            </Container>
        ),
        {
            ...size,
            fonts: [
                ...fontsData.map(({ name, data }) => ({
                    name,
                    data,
                })),
                {
                    name: 'Poppins',
                    data: poppins,
                },
            ],
        },
    );
}
