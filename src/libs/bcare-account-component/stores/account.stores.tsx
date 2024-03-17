import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  userDetails: UserDetails | null; // Define UserDetails interface as per your user details structure
  isLoggedIn: boolean;
  setTokens: (accessToken: string, refreshToken: string, userId: string) => void;
  setUserDetails: (userDetails: UserDetails) => void;
  getTokens: () => void;
  removeTokens: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
  userDetails: null,
  isLoggedIn: false,
  setTokens: (accessToken, refreshToken, userId) =>
    set((state) => ({
      ...state,
      accessToken,
      refreshToken,
      userId,
      isLoggedIn: true,
    })),
  setUserDetails: (userDetails) =>
    set((state) => ({
      ...state,
      userDetails,
    })),
  getTokens: async () => {
    try {
      const keys = ['access_token', 'refresh_token', 'user_id'];
      const result = await AsyncStorage.multiGet(keys);
      const tokens = {} as Partial<AuthStore>;
      result.forEach(([key, value]) => (tokens[key] = value));
      if (tokens.access_token && tokens.refresh_token && tokens.user_id) {
        set((state) => ({
          ...state,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          userId: tokens.user_id,
          isLoggedIn: true,
        }));
      }
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
    }
  },
  removeTokens: async () => {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_id']);
      set((state) => ({
        ...state,
        accessToken: null,
        refreshToken: null,
        userId: null,
        isLoggedIn: false,
        userDetails: null,
      }));
    } catch (error) {
      console.error('Failed to remove tokens:', error);
    }
  },
}));
