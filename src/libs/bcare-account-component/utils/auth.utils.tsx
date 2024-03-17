import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokens = async (accessToken: string, refreshToken: string, userId: string) => {
  try {
    await AsyncStorage.multiSet([
      ['access_token', accessToken],
      ['refresh_token', refreshToken],
      ['user_id', userId]
    ]);
  } catch (error) {
    console.error('Failed to store tokens:', error);
  }
};

export const getTokens = async () => {
  try {
    const keys = ['access_token', 'refresh_token', 'user_id'];
    const result = await AsyncStorage.multiGet(keys);
    const tokens = {};
    result.forEach(([key, value]) => (tokens[key] = value));
    return tokens;
  } catch (error) {
    console.error('Failed to retrieve tokens:', error);
    return null;
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_id']);
  } catch (error) {
    console.error('Failed to remove tokens:', error);
  }
};
