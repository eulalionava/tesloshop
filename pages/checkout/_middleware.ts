import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware(req:NextRequest,ev:NextFetchEvent){
    let token = req.cookies.get('token')?.value || '';
    
    try {
        await jwt.isValidToken(token);
        return NextResponse.next();
    } catch (error) {
        const requestPage = req.nextUrl.pathname;
        return NextResponse.redirect(`/auth/login?p=${requestPage}`)
    }
}