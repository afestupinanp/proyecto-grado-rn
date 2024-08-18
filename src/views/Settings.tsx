import React from "react";
import { ApplicationContext } from "@stores/AppContext";
import styles from "@styles/styles";
import { useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { makeApiCall } from "@utils/utils";
import SimcaiRoutes from "@constants/SimcaiRoutes";
import { writeDataToStorage } from "@stores/Storage";
import LocaleSelection from "@views/components/LocaleSelection";

const Settings = React.memo(() => {
    const appContext = useContext(ApplicationContext);

    const handleLogout = () => {
        const clearContextData = () => {
            appContext?.setAppData('userData', null);
            appContext?.setAppData('userLoggedIn', false);
            appContext?.setAppData('userToken', null);
            appContext?.setAppData('csrfToken', null);
            writeDataToStorage('userToken', '');
        }
        if (appContext?.appData) {
            makeApiCall(appContext?.appData, SimcaiRoutes.LOGOUT, 'GET', {}, {})
            .finally(() => {
                clearContextData();
            });
        }
    }

    return <View style={{...styles.container, flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
        <View style={{flex: 1}}>
            <LocaleSelection  />
            <Button onPress={handleLogout}>Logout</Button>
        </View>
    </View>;
});

export default Settings;