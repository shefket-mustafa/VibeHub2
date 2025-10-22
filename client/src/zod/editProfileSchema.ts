import { z } from "zod"

export const editProfileSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters!"),
    bio: z.string().min(3, "Bio must be at least 3 characters!"),
    age: z.number().min(1, "Must be a valid number").max(120, "Vampires not allowed.."),
    city: z.string().min(3, "City must be at least 3 characters!"),
    country: z.string().min(3, "Country must be at least 3 characters!")
})