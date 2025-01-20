"use client";
import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import Todolist from "@/components/ui/TodoList";

const TodoContainer = () => {
    const {
        loading,
        todos,
        onCreateEmptyTodos,
        onDeleteTodos,
        onSearchTodos,
        onUpdateTodos,
    } = useTodosController();

    // console.log(">>>>loading", loading);
    // console.log(">>>>todos", todos);
    return (
        <div>
            <Todolist
                shardUserFullName="이경민 테스트 유저"
                ownerUserId="111"
                loading={loading}
                todoListData={todos}
                isReadOnly={false}
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
