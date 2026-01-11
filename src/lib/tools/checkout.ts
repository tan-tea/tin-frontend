import { z } from 'zod';
import { tool } from 'ai';

import { OfferType } from 'shared/models/offer';

export const checkoutTool = tool({
    description: 'Generate a profesional checkout message for request service or product by Whatsapp',
    inputSchema: z.object({
        offerType: z.enum<Array<OfferType>>(['product', 'service']),
    }),
    execute: async ({ offerType }) => {
        return '';
    },
});
