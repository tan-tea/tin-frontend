import { z } from 'zod';

import type { OptionGroup } from 'shared/models';

export const createOptionGroupsSchema = (optionGroups: Array<OptionGroup>) =>
    z.object({
        options: z
            .record(z.string(), z.array(z.string()))
            .superRefine((options, ctx) => {
                for (const optionGroup of optionGroups) {
                    const { group } = optionGroup;

                    const selected = options[group.id] || [];

                    const minGroupItems = group.min ?? 1;
                    const maxGroupItems = group.max;

                    if (group.required && selected.length < minGroupItems) {
                        ctx.addIssue({
                            path: ['options', group.id],
                            message: `Selecciona al menos ${minGroupItems} opcion`,
                            code: 'custom',
                        });
                    }

                    if (group.max && selected.length > maxGroupItems) {
                        ctx.addIssue({
                            path: ['options', group.id],
                            message: `Maximo ${maxGroupItems} opciones`,
                            code: 'custom',
                        });
                    }
                }
            }),
    });

export type OptionGroups = z.infer<ReturnType<typeof createOptionGroupsSchema>>;
