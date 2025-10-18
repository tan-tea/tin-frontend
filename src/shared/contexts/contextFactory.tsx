'use client'

import {
    JSX,
    memo,
    useContext,
    createContext,
    type FC,
    type PropsWithChildren,
    type MemoExoticComponent,
} from 'react';

type ContextFactoryResult<T> = {
    Provider: MemoExoticComponent<FC<PropsWithChildren>>;
    useContext: () => T;
};

const contextFactory = <T,>(
    useContextState: () => T,
    defaultValue?: T,
    ContextComponent?: JSX.Element,
): ContextFactoryResult<T> => {
    const Context = createContext<T>(defaultValue || Object.create(null) as T);

    return {
        Provider: memo<PropsWithChildren>(({ children, }) => (
            <Context.Provider value={useContextState()}>
                {children}
                {ContextComponent}
            </Context.Provider>
        )) as any,
        useContext: () => useContext(Context),
    };
};

export default contextFactory;
