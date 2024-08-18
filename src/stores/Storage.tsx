import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This method writes into the storage of the user's device.
 * @param key 
 * @param defaultValue 
 * @returns 
 */
export const writeDataToStorage = async (key: string, value: string) => {
    console.log(`[DB storage] Writing into ${key}: ${value}`);
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
};

/**
 * This method reads from the storage in the user's device.
 * @param key 
 * @param defaultValue 
 * @returns 
 */
export const readDataFromStorage = async (key: string, defaultValue?: string|null) => {
    try {
        let data: string|null = await AsyncStorage.getItem(key);
        if (!data && defaultValue) {
            data = defaultValue;
        }
        console.log(`[DB storage] Reading from ${key}: ${data}`);
        return Promise.resolve(data);
    } catch (error) {
        console.error(error);
    }
    return Promise.reject(null);
};