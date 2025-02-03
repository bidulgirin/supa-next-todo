import React from "react";
import TodoContainer from "./components/TodoContainer";
import { getUser } from "@/auth/user.action";

const page = async () => {
  const user = await getUser({ serverComponent: true });

  return (
    <main>
      {user ? (
        <>
          <TodoContainer ownerUserId={user?.id} />
        </>
      ) : (
        <div className="flex w-full items-center ">로그인부터 해줘</div>
      )}
    </main>
  );
};

export default page;
