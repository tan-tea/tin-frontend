import { z } from 'zod';

export const signinUserSchema = () => z.object({
    email: z.email().nullable(),
    password: z.string().nullable(),
});

export type SigninUser = z.infer<ReturnType<typeof signinUserSchema>>;
