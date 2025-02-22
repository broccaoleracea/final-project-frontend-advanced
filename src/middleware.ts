
import { NextResponse, NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!; 
export const config = {
    matcher: ["/admin/:path*"],
};

function decodeJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }
    const payload = parts[1];4
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}


export async function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;
    if (!refreshToken || !accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const secret = new TextEncoder().encode(JWT_SECRET);

    try {
        const decoded = decodeJwt(refreshToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
            const response = NextResponse.redirect(new URL('/auth/login', request.url));
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            return response;
        }
        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification error:", error);
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
    }
        return NextResponse.next();
}

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
//
// export function middleware(request: NextRequest) {
//     return NextResponse.next();
// }
