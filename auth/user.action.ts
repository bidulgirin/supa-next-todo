import { createServerSideClient } from "@/lib/supabase";

export const getUser = async ({serverComponent = false}) => {
  const supabase = await createServerSideClient();
  const user = await supabase.auth.getUser();
  //const user = (await supabase).auth.getSessoin(); => 빠르긴한데 사용하지 말라고 권고함
  return user?.data?.user;
};


// profile 을 id 로 가져오는 함수
export const getProfileById = async ({
  serverComponent : false,
  userId : "",
}) => {
  const supabase = await createServerSideClient();

  const profile = await supabase.from('profiles').select("*").eq("id",userId);

  return profile?.data?.[0];

}