// 라우터 핸들러 예시 코드
import { NextResponse } from "next/server";

export const GET = async () => {
    console.log("ping GET API income");
    return NextResponse.json({ message: "pong" });
};
