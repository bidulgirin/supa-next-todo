// mvc 패턴을 따르고 있으므로 이러한 Controller 파일을 생성했다.
import {
    createTodos,
    deleteTodosSoft,
    getTodoAction,
    todosSearch,
    getTodosByUserId,
    updateTodos,
    //} from "@/apis/todos-no-rls";
} from "@/actions/todo/todo.action";
import { Database } from "@/types/database";
import { useState, useEffect } from "react";

type TodoDto = Database["public"]["Tables"]["todos_with_rls"]["Row"];

const useTodosController = (ownerUserId = "") => {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState<TodoDto[]>([]);

    const onGetTodos = async (userId = "") => {
        try {
            const resultTodos = await getTodosByUserId(userId);
            if (resultTodos) setTodos(resultTodos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onGetTodos(ownerUserId);
    }, []);

    /*
        먼저 비어있는 row 를 만들어서 
        그 row 에 content를 입력받게 update 시켜주는 방식을 사용
    */

    // 비어 있는 todos 만들기
    const onCreateEmptyTodos = async () => {
        await createTodos(""); // content 가 빈값인 채로 insert 되는 함수가 발동
        await onGetTodos();
    };

    // update 되는 todos 함수 만들기
    const onUpdateTodos = async (id: number, content: string) => {
        await updateTodos(id, content);
        await onGetTodos();
    };

    // 삭제하는 함수
    const onDeleteTodos = async (id: number) => {
        await deleteTodosSoft(id);
        await onGetTodos();
    };

    // 검색하는 함수
    const onSearchTodos = async (terms: string) => {
        if (terms) {
            const todoResult = await todosSearch(terms);
            if (todoResult) setTodos(todoResult);
        } else {
            alert("자료가 없습니다.");
            await onGetTodos();
        }
    };

    return {
        loading,
        todos,
        onCreateEmptyTodos,
        onUpdateTodos,
        onDeleteTodos,
        onSearchTodos,
    };
};

export default useTodosController;
