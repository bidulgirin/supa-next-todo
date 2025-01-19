// todos-no-rls 테이블과 통신할 곳
"use client";

import { createSupabaseBrowserClient } from "@/lib/client/supabase";

// todolist 가져오기
export const getTodos = async () => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false,
        });
    return result.data;
};

// todolist id 로 가져오기
export const getTodosById = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("id", id);

    return result.data;
};
// todolist 서치해서 가져오기
export const todosSearch = async (term: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .ilike("contents", `%${term}%`)
        .order("id", { ascending: false })
        .limit(500);
};

// createToDos

// updateToDos
