import { useEffect, useState } from 'react';
import { Appbar, BottomNavigation, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import routeMap, {renderScene} from '@Routes';
import Login from '@views/Login';

import { ApplicationContext } from '@stores/AppContext';
import ErrorBoundary from '@ErrorBoundary';
import ApplicationContextInterface from '@interfaces/ApplicationContextInterface';
import { makeApiCall } from '@utils/utils';
import SimcaiRoutes from '@constants/SimcaiRoutes';

import en from '@lang/en.json';
import es from '@lang/es.json';
import { LanguageNamespaces } from '@lang/constants';
import loadTheme from '@styles/theme';
import { readDataFromStorage, writeDataToStorage } from '@stores/Storage';

i18next.use(initReactI18next)
.init({
    fallbackLng: "en",
    resources: {
        es: es,
        en: en
    }
});

export default function App() {
    // Set up navigation
    const [index, setTabIndex] = useState(0);

    // TODO: load from user settings.
    const [appData, setAppData] = useState<ApplicationContextInterface>({
        baseUrl: '192.168.0.4',
        userLoggedIn: false,
        darkMode: true,
    });

    const { t: tTitles } = useTranslation(LanguageNamespaces.NAVIGATION);

    let connectionCount = 0;

    // On application start
    useEffect(() => {
        readDataFromStorage('userToken', '').then((value: string|null) => {
            if (value) {
                handleAppDataChange('userToken', value);
                handleAppDataChange('userLoggedIn', true);
            }
        });

        readDataFromStorage('locale').then((value: string|null) => {
            if (!value) {
                value = 'en';
                writeDataToStorage('locale', value);
            }
            handleAppDataChange('locale', value);
        });
    }, []);
    
    /**
     * This method requests for a CSRF token to the backend.
     */
    const requestToken = () => {
        makeApiCall(appData, SimcaiRoutes.REQUEST_CSRF, 'POST', {}, {})
        .then(({response}) => {
            console.log('CSRF token set');
            handleAppDataChange('csrfToken', response?.token);
        }).catch(() => {
            connectionCount++;
            if (connectionCount < 5) {
                requestToken();
            }
        });
    };

    const handleIndexChange = (idx: number) => {
        setTabIndex(idx);
        handleViewTitleChange(idx);
    }

    const handleViewTitleChange = (idx = index) => {
        const titleKey: string|undefined = routes[idx]?.key;
        if (titleKey) {
            handleAppDataChange('viewTitle', tTitles(titleKey));
        }
    }

    const routes = routeMap();

    // Track application state.
    useEffect(() => {
        console.log('[App state update] ', appData);
    }, [appData]);
    
    // Handle locale change
    useEffect(() => {
        i18next.changeLanguage(appData.locale);
        handleViewTitleChange();
    }, [appData.locale]);

    // Handle locale change
    useEffect(() => {
        if (!appData.csrfToken) {
            requestToken();
        }
    }, [appData.csrfToken]);
    
    /** Handle application data change. */
    const handleAppDataChange = (key: string, value: any) => {
        setAppData((state) => {
            return {
                ...state,
                [key]: value
            }
        });
    }

    // Load application theme.
    const theme: ThemeProp = loadTheme(appData?.darkMode);

    return (
        <ApplicationContext.Provider value={{appData, setAppData: handleAppDataChange}}>
            <PaperProvider theme={theme}>
                <ErrorBoundary>
                    {
                        appData?.userLoggedIn ?
                            <>
                                <Appbar.Header>
                                    {/* <Appbar.BackAction onPress={() => {}} /> */}
                                    <Appbar.Content title={appData?.viewTitle ?? ''} />
                                </Appbar.Header>
                                <BottomNavigation
                                    theme={theme}
                                    navigationState={{index, routes}}
                                    onIndexChange={(idx: number) => handleIndexChange(idx)}
                                    renderScene={renderScene}
                                />
                            </>
                        : 
                            <Login />
                    }
                    
                </ErrorBoundary>
            </PaperProvider>
        </ApplicationContext.Provider>
    );
}