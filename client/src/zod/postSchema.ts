import { z } from "zod";

 export const postSchema = z.object({
    content: z.string().min(4, "A post must have at least 4 characters!").max(500, "You have reached 500 characters!")
})

export type FeedPostData = z.infer<typeof postSchema>


