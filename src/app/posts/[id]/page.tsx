type Props = {
  params: {
    id: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const { id } = params;
  console.log("id", id);
  return <div>PostDetailPage</div>;
};

export default PostDetailPage;
