import { getPostById } from "../utils";

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const Post = await getPostById(postId);

  return <Post />;
}
