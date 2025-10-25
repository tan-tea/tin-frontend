import contextFactory from 'shared/contexts/contextFactory';
import useDyanmicThemeContextState from 'shared/contexts/dynamic-theme/useDynamicThemeContextState';

const {
    Provider,
    useContext,
} = contextFactory(useDyanmicThemeContextState);

export {
    Provider as DynamicThemeProvider,
    useContext as useDynamicTheme,
}
