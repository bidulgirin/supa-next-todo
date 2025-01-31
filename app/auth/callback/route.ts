// PKCE flow 방식 : 서버간 인증 방식
import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase";

export async function GET(request: Request) {
    const overRideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;
    const { searchParams, origin } = new URL(request.url);
    console.log("searchParams : ", searchParams);
    console.log("origin : ", origin);

    const code = searchParams.get("code");
    const next = searchParams.get("next");
    console.log("code : ", code);
    console.log("next : ", next);

    // 로그인 토큰 교환
    if (code) {
        const supabase = createServerSideClient();
        const { error } = await (
            await supabase
        ).auth.exchangeCodeForSession(code); //코드교환함수
        if (error) {
            return NextResponse.redirect(`${overRideOrigin}`);
        }
        return NextResponse.redirect(`${overRideOrigin}${next}`);
    }
    return NextResponse.redirect(`${overRideOrigin}`);
}
