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
    const isLoggedIn = !!user?.email;
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const goToHome = () => {
        router.push("/");
    };
    return (
        <header className="h-[50px] bg-white">
            <section className="px-6 h-full">
                <div className=" h-full flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center cursor-pointer">
                        Todo
                        <FcTodoList size={30} />
                    </div>
                    <div>
                        <FcGoogle size={30} />
                    </div>
                </div>
            </section>
        </header>
    );
};

export default AuthHeader;
