import React from "react";
import { Image, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useContext, useState } from "react";

import { handleFormStateChange, makeApiCall} from '@utils/utils';
import styles from "@styles/styles";
import { ApplicationContext } from "@stores/AppContext";
import { ResponseTypes } from "@constants/Generic";
import SimcaiRoutes from "@constants/SimcaiRoutes";
import { useTranslation } from "react-i18next";
import { LanguageNamespaces, LoginNamespace } from "@lang/constants";
import { writeDataToStorage } from "@stores/Storage";
import LocaleSelection from "./components/LocaleSelection";

const Login = React.memo(() => {
    const [form, setForm] = useState<Record<string, any>>({});
    const appContext = useContext(ApplicationContext);
    const {t: tLogin} = useTranslation(LanguageNamespaces.LOGIN);

    const loginAction = () => {
        if (form?.username && form?.password && appContext?.appData?.baseUrl) {
            makeApiCall(appContext?.appData, SimcaiRoutes.LOGIN, 'POST', {}, form)
            .then(({response}) => {
                if (response?.status == ResponseTypes.SUCCESS) {
                    appContext.setAppData('userToken', response?.token);
                    writeDataToStorage('userToken', response?.token);
                    obtainUserData();
                }
            })
            .catch(({statusCode}) => {
                if (statusCode == 400) {
                    obtainUserData();
                }
            });
        }
    }

    const obtainUserData = () => {
        if (appContext?.appData?.baseUrl) {
            makeApiCall(appContext.appData, SimcaiRoutes.USER_DATA, 'GET', {})
                .then(({response}) => {
                    if (response?.status == ResponseTypes.SUCCESS) {
                        appContext?.setAppData('userData', response?.user);
                        appContext?.setAppData('userLoggedIn', true);
                        appContext?.setAppData('csrfToken', null);
                    }
                });
        }
    }

    return <View style={styles.container}>
        <Image style={{width: 150, height: 150}} source={require('@assets/logo.png')} />
        <TextInput style={{width: '100%', marginTop: 10}} mode={'outlined'} label={tLogin(LoginNamespace.IDENTIFICATION)} value={form?.username} onChangeText={(text) => handleFormStateChange(setForm, 'username', text)} />
        <TextInput style={{width: '100%', marginTop: 10}} mode={'outlined'} secureTextEntry={true} label={tLogin(LoginNamespace.PASSWORD)} value={form?.password} onChangeText={(text) => handleFormStateChange(setForm, 'password', text)} />
        <LocaleSelection />
        <Button style={{width: '100%', marginTop: 15}} onPress={loginAction}>{tLogin(LoginNamespace.LOG_IN)}</Button>
    </View>;
});

export default Login;