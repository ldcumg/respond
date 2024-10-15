type Props = {
  params: {
    postId: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const { postId } = params;
  console.log("postId", postId);
  return <div>PostDetailPage</div>;
};

export default PostDetailPage;
