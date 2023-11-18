import { IPost } from "@/src/types/post";
import { NextPage, NextPageContext } from "next";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const fetchPost = async (id: number) => {
  const res = await fetch(`http://localhost:3080/posts/${id}`);
  return (await res.json()) as IPost;
};

const deletePost = async (id: number) => {
  "use server";
  const res = await fetch(`http://localhost:3080/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });

  revalidatePath("/blog");
  redirect("/blog");
};

const Page = async ({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}) => {
  const postData = await fetchPost(+params.slug);

  return (
    <div>
      <h1>post id = {params.slug}</h1>
      <h3>title: {postData.title}</h3>
      <h4>text: {postData.body}</h4>

      <form style={{ marginTop: "20px" }} action={deletePost.bind(null, +params.slug)}>
        <button type="submit">DELETE POST</button>
      </form>
    </div>
  );
};

export default Page;

