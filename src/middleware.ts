import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { error } from "console";

export async function middleware(req: NextRequest) {
    //get user token
    const token = req.cookies.get('user-token')?.value;

    //validate user authentication
    const verifiedToken = token && (await verifyAuth(token).catch((err) => {
        console.log(err);
    }));

    if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
        return;
    };

    const url = req.url

    if(url.includes('/login') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    };

    if(!verifiedToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    };
};

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};