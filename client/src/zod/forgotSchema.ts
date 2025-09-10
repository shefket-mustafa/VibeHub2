import z from "zod";

export const forgotSchema = z.object({
    email: z.string().email("Invalid email address!")
});

export type ForgotPasswordType = z.infer<typeof forgotSchema>