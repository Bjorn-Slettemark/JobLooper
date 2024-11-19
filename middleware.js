import { NextResponse } from 'next/server'

export function middleware(request) {
    // Handle preflight requests (OPTIONS)
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '86400' // 24 hours
            }
        });
    }

    // Handle actual request
    const response = NextResponse.next();
    
    // Add headers
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-vercel-protection-bypass');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
}

export const config = {
    matcher: [
        '/api/:path*',
        // Add other paths that need CORS here
    ]
}