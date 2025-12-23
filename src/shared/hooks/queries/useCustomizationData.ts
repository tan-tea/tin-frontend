import { minutesToMilliseconds } from 'date-fns';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getAllCustomizationByWorkspace } from 'app/actions';

import type {
    Customization
} from 'shared/models';
import { useCache } from 'shared/hooks';
import { customizationAtom } from 'shared/state';

type CustomizationData = Readonly<QueryObserverResult<Customization>> & {
    queryId: string;
};

type CustomizationDataHandler = () => CustomizationData;

const QUERY_ID = 'customization-data' as const;

export const useCustomizationData: CustomizationDataHandler = () => {
    'use memo'
    const {
        load,
        save,
    } = useCache<Customization | null>('customizations', customizationAtom)

    const query = useQuery({
        queryKey: [QUERY_ID],
        queryFn: async () => {
            const cached = await load('current', 1440);
            if (cached) return cached;

            const customization = await getAllCustomizationByWorkspace(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

            await save({
                ...customization,
                _id: customization.id,
                id: 'current',
            });

            return customization;
        },
        staleTime: minutesToMilliseconds(60),
        retry: 1,
    });

    return {
        ...query,
        queryId: QUERY_ID,
    };
};
