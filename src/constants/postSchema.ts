import { z } from "zod";

export const POST_SCHEMA = z.object({
  title: z.string().trim().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().trim().min(1, { message: "내용을 입력해주세요." })
});
