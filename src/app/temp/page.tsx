"use client";

import { useState } from "react";

const TempPage = () => {
  const [content, setContent] = useState("");

  return (
    <form>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}  />
      <button>게시물 작성하기</button>
    </form>
  );
};

export default TempPage;
