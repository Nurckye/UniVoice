import {AsyncStorage} from "react-native";

export const WPM = 120;

export function wordCount(str: string) {
    return str.split(" ").length;
}

export function readDuration(str: string) {
    return Math.ceil(wordCount(str) / (WPM / 60));
}

export function secondsToDuration(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const minutesStr = minutes >= 10 ? `${minutes}` : `0${minutes}`;
    const secondsStr = seconds >= 10 ? `${seconds}` : `0${seconds}`;

    return `${minutesStr}:${secondsStr}`;
}

export const fetchAllItems = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        return items;
    } catch (error) {
        console.log(error);
    }
}
