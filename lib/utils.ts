//비동기적으로 일정 시간(ms)을 기다리기 위한 함수
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
