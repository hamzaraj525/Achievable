import AsyncStorage from '@react-native-async-storage/async-storage';
import { getConfig } from '../config';

export const setAccessToken = async (token: string) => {
  await AsyncStorage.setItem(getConfig().JWT_TOKEN_STORAGE_KEY, token);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(getConfig().JWT_TOKEN_STORAGE_KEY);
};

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem(getConfig().JWT_TOKEN_STORAGE_KEY);
};
