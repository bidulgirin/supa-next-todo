"use client";
import React from "react";
import { FadeLoader } from "react-spinners";

const Error = () => {
    return (
        <div className="flex flex-col items-center mt-12">
            <div>
                <FadeLoader />
            </div>
            <div className="font-bold my-2">뭔가 문제가 생겼습니다.</div>
        </div>
    );
};

export default Error;
