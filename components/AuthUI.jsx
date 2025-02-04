"use client";
import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
const AuthUI = () => {
    const [user, setUser] = useState();
    // 미리 supabase 클라이언트를 가지고 왔으니 Auth 함수에 연결해주기
    const supabase = createSupabaseBrowserClient();
    //const isMount = useHydrate();

    // useCallback을 사용하여 getUserInfo 함수 메모이제이션
    const getUserInfo = useCallback(async () => {
        const result = await supabase.auth.getUser(); // auth에서 user 정보 가져오기
        console.log(result);
        if (result?.data.user) setUser(result?.data?.user);
    }, [supabase]); // supabase가 변경될 때만 함수 재생성

    const handleLogout = async () => {
        supabase.auth.signOut();
        window.location.reload();
    };

    // UI component 로 작업하기 싫을때 쓰는 코드~
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAth({
            provider: "google",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
            },
        });
    };
    // 이 형식은 외워두는게 좋을듯
    const handleGithubLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
            },
        });
    };
    // 버튼 UI에 바인딩 시켜서 쓰면 됩니다~ ( 디자인같은거 직접해야할때 쓸 방법 )

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);
    //if (!isMount) return null;
    return (
        <section className="w-full">
            <div>{user ? `로그인 됨 ${user?.email}` : "로그아웃"}</div>

            <div>
                {user && (
                    <button
                        className="border-2 border-black"
                        onClick={handleLogout}>
                        로그아웃
                    </button>
                )}
            </div>
            <div className="mx-auto max-w-[500px]">
                {/* 로그인 관련 UI */}
                <Auth
                    redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                    }}
                    onlyThirdPartyProviders
                    providers={["google", "github"]}
                />
            </div>
        </section>
    );
};

export default AuthUI;
