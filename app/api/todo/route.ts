// 서버 사이드 용 ServerActions + RouterHandler
import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase";
import { getTodoAction } from "@/actions/todo/todo.action";

// todo 가져오기
export const GET = async () => {
    // const supabase = await createServerSideClient();
    // const result = await supabase
    //     .from("todos_no_rls")
    //     .select("*")
    //     .is("deleted_at", null)
    //     .order("id", {
    //         ascending: false,
    //     });
    // console.log("GET result", result);
    // 위의 코드를 getTodoAction 함수에 담았음.
    const result = await getTodoAction();

    return NextResponse.json({ ...result });
};
