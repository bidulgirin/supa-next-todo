import { createServerSideClient } from "@/lib/supabase";

export const getUser = async () => {
    const supabase = await createServerSideClient();
    const user = await supabase.auth.getUser();
    //const user = (await supabase).auth.getSessoin(); => 빠르긴한데 사용하지 말라고 권고함
    return user?.data?.user;
};
