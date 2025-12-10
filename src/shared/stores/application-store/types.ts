type ApplicationTheme = 'light' | 'dark' | 'system';

type ApplicationLanguage = 'en' | 'es';

type ApplicationState = {
    theme: ApplicationTheme;
    language: ApplicationLanguage;
    geolocation: GeolocationPosition;
    loading: boolean;
    showHeader: boolean;
    showBottomNavigation: boolean;
};

type ApplicationActions = {
    setTheme: (theme: ApplicationTheme) => void;
    setLanguage: (language: ApplicationLanguage) => void;
    setGeolocation: (geolocation: GeolocationPosition) => void;
    setLoading: (loading: boolean) => void;
    setShowHeader: (show: boolean) => void;
    setShowBottomNavigation: (show: boolean) => void;
};

type ApplicationStore = ApplicationState & ApplicationActions;

export type {
    ApplicationTheme,
    ApplicationLanguage,
    ApplicationState,
    ApplicationActions,
    ApplicationStore,
};
