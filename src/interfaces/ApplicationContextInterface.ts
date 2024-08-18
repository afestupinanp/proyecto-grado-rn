/**
 * Provides the context with type safety.
 */
export default interface ApplicationContextDataInterface {
    userLoggedIn?: boolean;
    userData?: any;
    userToken?: string;
    csrfToken?: string;
    baseUrl?: string;
    viewTitle?: string;
    darkMode?: boolean;
    locale?: 'es' | 'en';
}

export interface ApplicationContextInterface {
    appData?: ApplicationContextDataInterface,
    setAppData(key: string, value: any): any
}