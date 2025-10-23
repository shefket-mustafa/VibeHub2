import { z } from "zod"

export const editProfileSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters!"),
    bio: z.string().min(3, "Bio must be at least 3 characters!"),
    age: z
    .string()
    .refine((val) => !val || (+val >= 1 && +val <= 120), "Age must be between 1 and 120"),
    city: z.string().min(3, "City must be at least 3 characters!"),
    country: z.string().min(3, "Country must be at least 3 characters!")
})

export type EditProfileType = z.infer<typeof editProfileSchema>