import * as path from "path";
import * as fs from "fs";
import dynamic from "next/dynamic";

const POSTS_DIR = "./src/app/content";
const POSTS_PATH = path.resolve(POSTS_DIR);

async function getPostById(postId: string) {
  const file = fs.readdirSync(POSTS_PATH).find((name) => name.split(".")[0] === postId);
  const fileName = file?.split(".")[0];

  const Post = dynamic(() =>
    import(`../../content/${fileName}`).then((mod) => {
      // console.log("mod:", mod);
      return mod.default;
    })
  );

  return Post;
}

function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);
  const fileNames = files?.map((file) => file.split(".")[0]);

  return fileNames;
}

export { getPostById, getAllPosts };
