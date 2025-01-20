"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleCheck, CiEdit } from "react-icons/ci";

const TodoListItem = ({
    todo,
    onUpdate = () => {
        onUpdate;
    },
    onDelete = () => {
        onDelete;
    },
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [userInput, setUserInput] = useState(todo?.content ?? "");

    // 수정모드 클릭했을때 input 박스 보이게
    const onStartEdit = () => {
        setIsEdit(true);
    };

    // 수정이 끝났을때
    const onFinishEdit = () => {
        onUpdate(todo.id, userInput);
        setIsEdit(false);
    };
    // 삭제버튼을 눌렀을때
    const onClickDelete = () => {
        onDelete(todo.id);
    };

    return (
        <li
            className="
                min-h-[60px]
                bg-[#B290D9]
                border
                border-black
                rounded-2xl
                font-bold
                group
    ">
            <article
                className="
                min-h-[60px] 
                p-4 
                flex 
                flex-col
                sm:flex-row gap-4
                group
            ">
                {isEdit ? (
                    <input
                        className="flex-1 text-[18px]"
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value);
                        }}></input>
                ) : (
                    <div
                        className="flex-1"
                        onClick={() => {
                            onStartEdit();
                        }}>
                        {" "}
                        {todo?.content}
                    </div>
                )}
                <div className="w-fit hidden group-hover:flex self-end">
                    {isEdit ? (
                        <div
                            className="
                                w-[45px] h-[45px] 
                                flex justify-center 
                                items-center bg-[#7ebb95] 
                                border border-black 
                                rounded-2xl cursor-pointer
                            "
                            onClick={() => {
                                onFinishEdit();
                            }}>
                            <CiCircleCheck />
                        </div>
                    ) : (
                        <div
                            className="
                                w-[45px] h-[45px] 
                                flex justify-center 
                                items-center bg-[#7ebb95] 
                                border border-black 
                                rounded-2xl cursor-pointer
                            "
                            onClick={() => {
                                onStartEdit();
                            }}>
                            <CiEdit />
                        </div>
                    )}
                    <div
                        className="
                                w-[45px] h-[45px] 
                                flex justify-center 
                                items-center bg-[#d94f4f] 
                                border border-black 
                                rounded-2xl cursor-pointer
                            "
                        onClick={() => {
                            onClickDelete(todo?.id);
                        }}>
                        <AiOutlineDelete />
                    </div>
                </div>
            </article>
        </li>
    );
};

export default TodoListItem;
