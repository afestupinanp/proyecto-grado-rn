import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { BottomNavigation } from 'react-native-paper';

// Import application components
import Home from "@views/Home";
import Settings from '@views/Settings';
import { useTranslation } from "react-i18next";

/**
 * Defines the route map for the app.
 * @returns 
 */
const routeMap = (): BaseRoute[] => {
    const {t} = useTranslation('navigation');
    return [
        {
            key: 'home',
            title: t('home'),
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline'
        },
        {
            key: 'settings',
            title: t('settings'),
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline'
        }
    ]
}

/**
 * Render map for the components. Make sure is aligned with top route map.
 */
export const renderScene = BottomNavigation.SceneMap({
    home: Home,
    settings: Settings
});

export default routeMap;