import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

// supabase 와 상호작용을 하기위한 browserClient 를 생성하는 함수
export const createSupabaseBrowserClient = () => {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
};
