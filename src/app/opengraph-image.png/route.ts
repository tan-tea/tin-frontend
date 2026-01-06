import fs from 'node:fs';
import path from 'node:path';

import { NextResponse } from 'next/server';

import { clientEnv } from 'env/client';

export async function GET() {
    const workspaceName = clientEnv.NEXT_PUBLIC_WORKSPACE_NAME;

    const opengraphPath = path.join(process.cwd(), 'public', 'opengraph', `${workspaceName}.png`);
    const fallbackPath = path.join(process.cwd(), 'public', 'opengraph', 'default.png');

    const file = fs.readFileSync(fs.existsSync(opengraphPath) ? opengraphPath : fallbackPath);

    const buffer = new Uint8Array(file);

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'image/png',
        },
    });
}
