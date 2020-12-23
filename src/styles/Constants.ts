import {Dimensions} from 'react-native';
import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

export const DEVICE_WIDTH = Math.round(Dimensions.get('window').width);
export const DEVICE_HEIGHT = Math.round(Dimensions.get('window').height);
export const LATERAL_PADDING = 24;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
