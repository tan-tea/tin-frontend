import { z } from 'zod';

export const searchInSchema = () => z.object({
    query: z.string(),
});

export type SearchIn = z.infer<ReturnType<typeof searchInSchema>>;
