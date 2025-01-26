import { pingAction } from "@/actions/ping/ping.action";
import { sleep } from "@/lib/utils";
import React from "react";
import ClientComponentText from "./components/ClientComponentText";
import { getTodoAction } from "@/actions/todo/todo.action";

const page = async () => {
    await sleep(1500);

    //const result = await pingAction();
    const result = await getTodoAction();
    const jsonResult = JSON.stringify(result);
    return (
        <div>
            todo page
            <ClientComponentText />
        </div>
    );
};

export default page;
