import React from "react";
import CreatePostForm from "./components/CreatePostForm";
import { redirect } from "next/navigation";

const Page = () => {
  const onSuccessCreate = async (id: number) => {
    "use server";
    redirect(`/blog/${id}`);
  };

  return (
    <div>
      <CreatePostForm onSuccessCreate={onSuccessCreate} />
    </div>
  );
};

export default Page;

