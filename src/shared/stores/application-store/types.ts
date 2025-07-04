type ApplicationTheme = 'light' | 'dark' | 'system';

type ApplicationLanguage = 'en' | 'es';

type ApplicationState = {
    theme: ApplicationTheme;
    language: ApplicationLanguage;
    geolocation: GeolocationPosition;
};

type ApplicationActions = {
    setTheme: (theme: ApplicationTheme) => void;
    setLanguage: () => void;
    setGeolocation: (geolocation: GeolocationPosition) => void;
};

type ApplicationStore = ApplicationState & ApplicationActions;

export type {
    ApplicationTheme,
    ApplicationLanguage,
    ApplicationState,
    ApplicationActions,
    ApplicationStore,
};
