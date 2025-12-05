import fs from 'node:fs';
import path from 'node:path';

import { NextResponse } from 'next/server';

import { clientEnv } from 'env/client';

export async function GET() {
    const workspaceName = clientEnv.NEXT_PUBLIC_WORKSPACE_NAME;

    const faviconPath = path.join(process.cwd(), 'public', 'favicons', `${workspaceName}.ico`);
    const fallbackPath = path.join(process.cwd(), 'public', 'favicons', 'default.ico');

    const file = fs.readFileSync(fs.existsSync(faviconPath) ? faviconPath : fallbackPath);

    const buffer = new Uint8Array(file);

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'image/x-icon',
        },
    });
}
