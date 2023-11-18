import { IPost } from "@/src/types/post";
import Link from "next/link";
import React from "react";
import CreatePostForm from "./create/components/CreatePostForm";
import { revalidatePath } from "next/cache";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:3080/posts");
  return (await res.json()) as IPost[];
};

const Page = async () => {
  const data = await fetchPosts();

  const onSuccessCreate = async (id: number) => {
    "use server";
    revalidatePath("/blog");
  };

  return (
    <div>
      <Link href={"/blog/create"}>CREATE POST PAGE</Link>

      <div className="list">
        {data?.map((p) => (
          <Link key={p.id} href={`blog/${p.id}`}>
            <h4>{p.title}</h4>
            <h5>{p.body}</h5>
          </Link>
        ))}
      </div>

      <CreatePostForm onSuccessCreate={onSuccessCreate} />
    </div>
  );
};

export default Page;

