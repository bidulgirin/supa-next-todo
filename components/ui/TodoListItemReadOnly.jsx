"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleCheck, CiEdit } from "react-icons/ci";

const TodoListItem = ({ todo }) => {
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
                <div className="flex-1"> {todo?.content}</div>
            </article>
        </li>
    );
};

export default TodoListItem;
