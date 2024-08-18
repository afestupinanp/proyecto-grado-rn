/** Available application languages */
export enum AvailableLanguages {
    es = 'es',
    en = 'en'
}

/** Available translation namespaces. */
export enum LanguageNamespaces {
    HOME = 'home',
    NAVIGATION = 'navigation',
    ERRORS = 'errors',
    SETTINGS = 'settings',
    LOGIN = 'login'
}

/** The navigation namespace language */
export enum NavigationNamespace {
    HOME = 'home',
    SETTINGS = 'settings',
}

/** The home namespace language */
export enum HomeNamespace {
    TOOLS_HEADER = 'tools-header',
}

/** The error namespace language */
export enum ErrorsNamespace {
    OFFLINE = 'offline',
}

/** The error namespace language */
export enum SettingsNamespace {
    LANGUAGE = 'language',
    LANGUAGES_ES = 'languages.spanish',
    LANGUAGES_EN = 'languages.english',
}


/** The error namespace language */
export enum LoginNamespace {
    IDENTIFICATION = 'identification',
    PASSWORD = 'password',
    LOG_IN = 'log-in'
}