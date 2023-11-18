import { IPost } from "@/src/types/post";
import { redirect } from "next/navigation";
import React from "react";

interface IProps {
  onSuccessCreate: (id: number) => Promise<void>;
}

const CreatePostForm = ({ onSuccessCreate }: IProps) => {
  async function createPost(data: FormData) {
    "use server";
    const { title, body } = Object.fromEntries(data);

    const res = await fetch(`http://localhost:3080/posts`, {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 123 }),
      headers: { "Content-type": "application/json" },
    });

    const newPost = (await res.json()) as IPost;
    await onSuccessCreate(newPost.id);
  }

  return (
    <form action={createPost}>
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="body" placeholder="body" />
      <button type="submit">create post</button>
    </form>
  );
};

export default CreatePostForm;

