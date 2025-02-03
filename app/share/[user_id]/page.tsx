import { getProfileById } from "@/auth/user.action";
import React from "react";

interface sharePageProps {
  params: { user_id: string };
  searchParams: {};
}
const sharePage = async (props: sharePageProps) => {
  const user_id = props?.params?.user_id;
  const profile = getProfileById({ serverComponent: true, userId });

  return <div>share page</div>;
};

export default sharePage;
