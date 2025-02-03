import React from "react";

interface sharePageProps {
  params: { user_id: string };
  searchParams: {};
}
const sharePage = async (props: sharePageProps) => {
  console.log("props>>>>>", props);

  const user_id = props?.params?.user_id;

  console.log("user_id>>>", user_id);

  return <div>share page</div>;
};

export default sharePage;
