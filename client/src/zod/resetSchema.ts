import {z} from "zod";

export const resetSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters!"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"]
})
export type resetPasswordType = z.infer<typeof resetSchema>