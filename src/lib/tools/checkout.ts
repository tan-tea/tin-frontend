import { z } from 'zod';
import { tool } from 'ai';

export const checkoutTool = tool({
    description: 'Generate a profesional checkout message for request service or product by Whatsapp',
    inputSchema: z.object({
        offerType: z.enum(['product', 'service']),
    }),
    execute: async ({ offerType }) => {
        return '';
    },
});
