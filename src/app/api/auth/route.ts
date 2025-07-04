import { NextRequest, NextResponse } from 'next/server';

import { get, post } from 'lib/http';

export async function GET(req: NextRequest) {}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            url,
            clientId,
            clientSecret,
            grantType,
            redirectURI,
            code,
        } = body;

        // const response = await post<any>(
        //     url,
        //     new URLSearchParams({
        //         ...rest,
        //     }),
        //     {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //     },
        // );
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: grantType,
                redirect_uri: redirectURI,
                code: code,
            }),
        });

        const data = await response.json();

        return NextResponse.json({
            message: 'success',
            data,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: true,
                message: 'Something went wrong',
            },
            {
                status: 400,
            },
        );
    }
}
