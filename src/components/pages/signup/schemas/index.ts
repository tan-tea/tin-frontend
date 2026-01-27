import { z } from 'zod';

export const signupUserSchema = () => z.object({
    name: z.string()
        .describe('User full name')
        .max(120),
    email: z.email()
        .describe('User email'),
    password: z.string()
        .describe('User strong password')
        .min(6),
    confirmPassword: z.string()
        .describe('User strong password confirmation')
        .min(6),
    image: z.string().nullable(),
});

export type SignupUser = z.infer<ReturnType<typeof signupUserSchema>>;
