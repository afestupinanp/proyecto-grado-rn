import { AvailableLanguages, LanguageNamespaces, SettingsNamespace } from "@lang/constants";
import { ApplicationContext } from "@stores/AppContext";
import { writeDataToStorage } from "@stores/Storage";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Option } from "react-native-paper-dropdown";

const LocaleSelection = () => {
    const appContext = useContext(ApplicationContext);
    const {t} = useTranslation(LanguageNamespaces.SETTINGS);
    
    const options: Option[] = [
        {
            label: t(SettingsNamespace.LANGUAGES_EN),
            value: AvailableLanguages.en
        },
        {
            label: t(SettingsNamespace.LANGUAGES_ES),
            value: AvailableLanguages.es
        }
    ];
    

    const handleLanguageChange = (value: string|undefined) => {
        if (value && appContext?.setAppData) {
            appContext?.setAppData('locale', value);
            writeDataToStorage('locale', value);
        }
    }

    return <Dropdown
        key={'settings-locale-dropdown'}
        value={appContext?.appData?.locale ?? 'en'}
        options={options}
        label={t(SettingsNamespace.LANGUAGE)}
        onSelect={handleLanguageChange}
        mode="outlined"
        hideMenuHeader={true}
    />
};

export default LocaleSelection;