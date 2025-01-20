// 서버 단 클라이언트 ( 쿠키 조작 )
// Supabase의 데이터베이스 타입 정의 가져오기
import { Database } from "@/types/supabase";
// Supabase의 서버 클라이언트를 생성하기 위한 함수
import { createServerClient } from "@supabase/ssr";
// Next.js의 내장 쿠키 핸들러
import { cookies } from "next/headers";
// cookies-next 라이브러리를 사용해 쿠키를 읽고 쓰는 함수
import { getCookie, setCookie } from "cookies-next";
// Next.js에서 요청(Request) 및 응답(Response) 처리 객체
import { NextRequest, NextResponse } from "next/server";

// RouterHandler, RSC, Middleware, ServerActions를 처리하기 위한 클라이언트 생성 함수들

// - ServerActions와 RouterHandler에서 사용
export const createServerSideClient = async (serverComponent = false) => {
    // Next.js의 내장 쿠키 핸들러를 가져오기
    const cookieStore = cookies();

    // Supabase 서버 클라이언트를 생성하고 쿠키 조작 로직 정의
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase 프로젝트의 URL
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase 프로젝트의 익명 키
        {
            cookies: {
                // 쿠키를 읽는 함수
                get: (key) => cookieStore.get(key)?.value,
                // 쿠키를 설정하는 함수
                set: (key, value, options) => {
                    cookieStore.set(key, value, options);
                },
                // 쿠키를 삭제하는 함수
                remove: (key, options) => {
                    cookieStore.set(key, "", options); // 빈 값을 설정해 쿠키 삭제
                },
            },
        }
    );
};

// - React Server Components (RSC)에서 사용
export const createServerClientRSC = () => {
    // React Server Components 전용 클라이언트 생성
    return createServerSideClient(true);
};

// - Middleware에서 사용
export const createServerSideMiddleware = async (
    req: NextRequest, // 요청 객체
    res: NextResponse // 응답 객체
) => {
    // Supabase 서버 클라이언트를 생성하고 쿠키 조작 로직 정의
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase 프로젝트의 URL
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase 프로젝트의 익명 키
        {
            cookies: {
                // cookies-next 라이브러리를 이용해 쿠키를 읽는 함수
                get: (key) => getCookie(key, { req, res }),
                // cookies-next 라이브러리를 이용해 쿠키를 설정하는 함수
                set: (key, value, options) => {
                    setCookie(key, value, { req, res, ...options });
                },
                // cookies-next 라이브러리를 이용해 쿠키를 삭제하는 함수
                remove: (key, options) => {
                    setCookie(key, "", { req, res, ...options }); // 빈 값을 설정해 쿠키 삭제
                },
            },
        }
    );
};
