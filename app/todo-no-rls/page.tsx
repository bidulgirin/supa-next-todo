import { sleep } from "@/lib/utils";
import React from "react";
import TodoContainer from "./components/TodoContainer";

const page = async () => {
    await sleep(1000);
    return (
        <div>
            <TodoContainer />
        </div>
    );
};

export default page;
