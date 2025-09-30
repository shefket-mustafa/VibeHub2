import { z } from "zod"

export const createGroupSchema = z.object({
    name: z.string().min(3, "Group name must be at least 3 characters"),
    description: z.string().min(10, "Description is too short"),
    type: z.enum(["public", "private"]),
  });
  
  export type CreateGroupData = z.infer<typeof createGroupSchema>;