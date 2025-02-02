"use client";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FcGoogle, FcTodoList } from "react-icons/fc";
import React from "react";

interface AuthHeaderProps {
    user?: User | null;
}
//const AuthHeader = (props: AuthHeaderProps) => {
const AuthHeader = ({ user }: AuthHeaderProps) => {
    console.log("user", user);
    const isLoggedIn = !!user?.email;
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    // 집으로 감
    const goToHome = () => {
        router.push("/");
    };
    // 구글 로그인 됨
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
            },
        });
    };
    // 로그아웃 함
    const handleLogOut = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };
    return (
        <header className="h-[50px] bg-white">
            <section className="px-6 h-full">
                <div className=" h-full flex flex-row justify-between items-center">
                    <div
                        className="flex flex-row items-center cursor-pointer gap-2"
                        onClick={goToHome}>
                        Todo
                        <FcTodoList size={30} />
                    </div>
                    {isLoggedIn ? (
                        <div>
                            <div
                                className="flex flex-row items-center cursor-pointer gap-2"
                                onClick={handleLogOut}>
                                LogOut
                                <FcGoogle size={30} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div
                                className="flex flex-row items-center cursor-pointer gap-2"
                                onClick={handleGoogleLogin}>
                                Login
                                <FcGoogle size={30} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </header>
    );
};

export default AuthHeader;
