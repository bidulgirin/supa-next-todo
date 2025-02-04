"use client";
import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import Todolist from "@/components/ui/TodoList";

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
            <Todolist
                ownerUserId={ownerUserId}
                loading={loading}
                isReadOnly={false}
                todoListData={todos}
                onCreate={() => {
                    onCreateEmptyTodos();
                }}
                onUpdate={(id: number, content: string) => {
                    onUpdateTodos(id, content);
                }}
                onDelete={(id: number) => {
                    onDeleteTodos(id);
                }}
                onSearch={(terms: string) => {
                    onSearchTodos(terms);
                }}
            />
        </div>
    );
};

export default TodoContainer;
