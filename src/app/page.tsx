import Link from "next/link";
import Image from "next/image";

type Post = {
  postId: string; // file name
  title: string;
  subtitle: string;
  date: Date;
};

export default async function Home() {
  return (
    <main className="md:mt-20 mt-10 min-h-screen">
      <section className="md:mb-20 mb-10">
        <div className="h-60 mb-10 rounded-md relative">
          <Image
            src={`abstract1.jpg`}
            alt={"abstract art"}
            priority={true}
            style={{ borderRadius: "6px", objectFit: "cover" }}
            fill
          />
          <h1 className="px-2 mb-2 absolute bottom-0 left-2 bg-background rounded-md">Welcome</h1>
        </div>
        <p>
          Hi, I&apos;m Gabriele, a data engineer curious about technology and the world. I build solid data
          infrastructures and automation systems. Here I share my thoughts about technology, along with some intuitions
          and thoughts on disparate topics.
        </p>
      </section>
      <section>
        <div className="w-fit md:mb-20 mb-10 mx-auto text-5xl">&#10086;</div>
        <h1 className="mb-6">All Posts</h1>
        <ul className="mb-2 space-y-4">
          {posts
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((post) => (
              <li key={post.postId} className="relative group">
                <div className="absolute -left-7 text-2xl invisible group-hover:visible">&#10022;</div>
                <Link href={`/blog/${post.postId}`} className="flex justify-between items-end">
                  <h3 className="font-helvetica text-textcolor hover:text-foreground">{post.title}</h3>
                  <p className="text-sm text-[#717171] md:visible invisible">{post.date.toISOString().split("T")[0]}</p>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

const posts = [
  {
    postId: "atomic-ops",
    title: "Atomics, Locks and Micro Benchmarks",
    subtitle: "",
    date: new Date("2025-03-15"),
  },
  {
    postId: "tech-realism",
    title: "Technological Hyper Realism",
    subtitle: "",
    date: new Date("2025-03-01"),
  },
  {
    postId: "useful-agents",
    title: "Are AI Agents going to replace us?",
    subtitle: "",
    date: new Date("2025-02-10"),
  },
] as Post[];
