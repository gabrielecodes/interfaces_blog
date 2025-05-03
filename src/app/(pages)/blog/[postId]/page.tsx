import { getAllPosts, getPostById } from "../utils";

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const Post = await getPostById(postId);

  return <Post />;
}

export async function generateStaticParams() {
  const postIds = getAllPosts();
  return postIds.map((postId) => ({ postId: postId.toString() }));
}
