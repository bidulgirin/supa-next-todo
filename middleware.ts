// 미들웨어 코드 작성해보기
// 사용용도 : 특정경로에 왔을때 공통적으로 처리할 로직을 담을 수 있음

import { NextRequest, NextResponse } from "next/server";

const COOKIE_COUNTER = "cookie-counter";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    // 미들웨어 동작 작성
    if (request.cookies.get(COOKIE_COUNTER)?.value) {
        const prev = request.cookies.get(COOKIE_COUNTER)?.value;
        response.cookies.set(COOKIE_COUNTER, `${Number(prev) + 1}`);
        // 새로고침을 하니 2씩 늘어나는 현상이 있어 서치해보니
        // 브라우저단과 서버단에서 미들웨어가 한번씩 동작하기 때문이라고 한다.!
    } else {
        response.cookies.set(COOKIE_COUNTER, "1"); // 값은 string 형태로 들어와야한다.
    }

    return response;
}

export const configs = {
    matcher: ["/", "/todo-no-rls", "/api/:path*"],
};
