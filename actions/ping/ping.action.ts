"use server"; // 서버에서만 동작하는 파일임을 선언

export async function pingAction() {
    console.log("액션 빔~~~~~~~~~~~");
    return "pong";
}
