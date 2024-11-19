import { NextResponse } from 'next/server'

export function middleware(request) {
    const response = NextResponse.next()

    response.headers.set('Access-Control-Allow-Credentials', "true")
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-vercel-protection-bypass, Authorization')

    return response
}

export const config = {
    matcher: '/api/:path*',
}