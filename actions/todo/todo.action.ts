// SeverActions 의 예시로 getActionList 액션만들기
"use server";

import { createServerSideClient } from "@/lib/supabase";

export const getTodoAction = async () => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false,
        });

    return result.data;
};
// todolist 가져오기
// export const getTodos = async () => {
//     const supabase = await createServerSideClient();
//     const result = await supabase
//         .from("todos_with_rls")
//         .select("*")
//         .is("deleted_at", null)
//         .order("id", {
//             ascending: false,
//         });
//     return result.data;
// };
// todolist id 로 가져오기
export const getTodosById = async (id: number) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("id", id);

    return result.data;
};
// todolist 서치해서 가져오기
export const todosSearch = async (terms: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .ilike("content", `%${terms}%`)
        .order("id", { ascending: false })
        .limit(500);
    return result.data;
};

// createToDos
export const createTodos = async (content: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .insert({ content })
        .select();

    return result.data;
};
// updateToDos
export const updateTodos = async (id: number, content: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select();

    return result.data;
};

// softDelete 구현하기 : 실제 데이터를 삭제하지 않는 방법, 실무에서는 이렇게 할 것
export const deleteTodosSoft = async (id: number) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .update({
            deleted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
};
