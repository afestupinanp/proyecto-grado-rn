import { DefaultTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

const loadTheme = (darkMode: boolean = false): ThemeProp => {
    return {
        ...DefaultTheme,
            dark: darkMode,
            colors: {
                ...DefaultTheme.colors,
                primary: 'rgba(5, 98, 188, 1)'
            }
    }
}

export default loadTheme;