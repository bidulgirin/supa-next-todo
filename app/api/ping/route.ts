// 라우터 핸들러 예시 코드
import { NextResponse } from "next/server";

export const GET = async () => {
    console.log("ping GET API income");
    return NextResponse.json({ message: "pong" });
};

/*
    Next.js 에서 다루는 http 메소드들...
    Supported HTTP Methods
    The following HTTP methods are supported: 
    GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. 

    => 어 이거 백엔드...? 여기서 내가 백엔드 기능을 다루겠구나...!
*/
