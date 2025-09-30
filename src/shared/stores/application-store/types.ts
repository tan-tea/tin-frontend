type ApplicationTheme = 'light' | 'dark' | 'system';

type ApplicationLanguage = 'en' | 'es';

type ApplicationState = {
    theme: ApplicationTheme;
    language: ApplicationLanguage;
    geolocation: GeolocationPosition;
    showHeader: boolean;
    showBottomNavigation: boolean;
};

type ApplicationActions = {
    setTheme: (theme: ApplicationTheme) => void;
    setLanguage: () => void;
    setGeolocation: (geolocation: GeolocationPosition) => void;
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
