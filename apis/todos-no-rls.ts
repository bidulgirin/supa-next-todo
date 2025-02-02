// todos-no-rls 테이블과 통신할 곳 ( 클라이언트 사이드 )
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
export const todosSearch = async (terms: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .ilike("content", `%${terms}%`)
        .order("id", { ascending: false })
        .limit(500);
    return result.data;
};

// createToDos
export const createTodos = async (content: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .insert({ content })
        .select();

    return result.data;
};
// updateToDos
export const updateTodos = async (id: number, content: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select();

    return result.data;
};

// softDelete 구현하기 : 실제 데이터를 삭제하지 않는 방법, 실무에서는 이렇게 할 것
export const deleteTodosSoft = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .update({
            deleted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
};

// hardDelete row 날려버리기
export const deleteTodosHard = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.from("todos_no_rls").delete().eq("id", id);

    return result.data;
};
