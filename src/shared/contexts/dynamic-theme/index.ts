import contextFactory from 'shared/contexts/contextFactory';
import contextState from 'shared/contexts/dynamic-theme/use-dynamic-theme';

const {
    Provider: DynamicThemeProvider,
    useContext: useDynamicTheme,
} = contextFactory(contextState);

export {
    DynamicThemeProvider,
    useDynamicTheme,
};
