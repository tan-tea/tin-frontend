type ApplicationTheme = 'light' | 'dark' | 'system';

type ApplicationLanguage = 'en' | 'es';

type ApplicationState = {
    theme: ApplicationTheme;
    language: ApplicationLanguage;
    discord: {
        accessToken: string | null;
        expiresIn: number | null;
    };
};

type ApplicationActions = {
    setTheme: (theme: ApplicationTheme) => void;
    setLanguage: () => void;
    setDiscordPayload: (
        accessToken: string,
        expiresIn: number,
    ) => void;
};

type ApplicationStore = ApplicationState & ApplicationActions;

export type {
    ApplicationTheme,
    ApplicationLanguage,
    ApplicationState,
    ApplicationActions,
    ApplicationStore,
};
