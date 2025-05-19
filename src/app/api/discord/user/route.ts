import {
    NextRequest,
    NextResponse,
} from 'next/server';

import { get, } from 'lib/http';

import { DiscordUser, } from 'contexts/shared/domain/models';
import { UrlBuilder, } from 'contexts/shared/infrastructure/builders/UrlBuilder';

type Response = DiscordUser | {
    error: true;
    message: string;
};

export async function GET(
    req: NextRequest,
) {
    const token = req.headers.get('authorization');
    if (!token)
        return NextResponse
            .json<Response>({
                error: true,
                message: 'Missing token',
            }, { status: 401, });

    try {
        const endpoint = new UrlBuilder(process.env.DISCORD_URL!, 'api/users/@me')
            .build();

        const response = await get<Response>(endpoint, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json<Response>(response);
    } catch (err) {
        return NextResponse
            .json<Response>({
                error: true,
                message: 'Something went wrong',
            }, { status: 400, });
    }
}
