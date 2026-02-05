import { z } from 'zod';

export const signinUserSchema = () => z.object({
    email: z.email(),
    password: z.string().min(6),
    remember: z.boolean().optional(),
});

export type SigninUser = z.infer<ReturnType<typeof signinUserSchema>>;
