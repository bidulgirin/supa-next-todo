import { getProfileById } from "@/auth/user.action";
import { permanentRedirect } from "next/navigation";
import React from "react";
import TodoContainer from "./components/TodoContainer";

interface sharePageProps {
    params: { user_id: string };
    searchParams: {};
}
const sharePage = async (props: sharePageProps) => {
    const userId = props?.params?.user_id;
    // 공유한 사람의 아이디의 프로필
    const profile = await getProfileById({ serverComponent: true, userId });
    const userName = profile?.full_name;

    // 올바른 프로필이 아니면 돌려보냄
    if (!profile) permanentRedirect("/");

    return (
        <div>
            <TodoContainer
                ownerUserId={userId}
                shardUserFullName={userName ?? ""}
            />
        </div>
    );
};

export default sharePage;
