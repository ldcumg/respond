import { getMyPosts } from "@/services/post/serverAction";
import Link from "next/link";

// 임시
const user_id = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
const nickname = "123";

const PostList = async () => {
  const myPosts = await getMyPosts(user_id);
  console.log("myPosts", myPosts);
  return (
    <ol>
      {myPosts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <h6>{post.title}</h6>
          <p>{post.created_at}</p>
        </Link>
      ))}
    </ol>
  );
};

export default PostList;
