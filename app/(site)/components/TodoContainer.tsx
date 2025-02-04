"use client";
import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

interface TodoContainerProps {
    ownerUserId?: string;
}

const TodoContainer = ({ ownerUserId }: TodoContainerProps) => {
    const {
        loading,
        todos,
        onCreateEmptyTodos,
        onDeleteTodos,
        onSearchTodos,
        onUpdateTodos,
    } = useTodosController(ownerUserId);

    return (
        <div>
            <TodoList
                ownerUserId={ownerUserId}
                loading={loading}
                isReadOnly={false}
                onUpdate={onUpdateTodos}
                onCreate={onCreateEmptyTodos}
                onDelete={onDeleteTodos}
                onSearch={onSearchTodos}
                todoListData={todos}
            />
        </div>
    );
};

export default TodoContainer;
