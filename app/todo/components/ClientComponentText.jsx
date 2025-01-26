"use client";
import { pingAction } from "@/actions/ping/ping.action";
import { getTodoAction } from "@/actions/todo/todo.action";
import React from "react";

const ClientComponentText = () => {
    const handleClick = async () => {
        //const result = await pingAction();
        const result = await getTodoAction();
        console.log("여기는 클라이언트서버", result); // 서버로 갔다가 클라이언트로 오는 과정을 거침
    };
    return (
        <div>
            브라우저에서 서버 액션버튼??
            <button className="bg-pink-100 text-red-500" onClick={handleClick}>
                액션 빔~
            </button>
        </div>
    );
};

export default ClientComponentText;
