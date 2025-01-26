// SeverActions 의 예시로 getActionList 액션만들기
"use server";

import { createServerSideClient } from "@/lib/supabase";

export const getTodoAction = async () => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false,
        });
    console.log("todoAction", result);

    return result.data;
};
