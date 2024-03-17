import { DefaultTheme } from "react-native-paper";

export const rootEndPoint='http://192.168.3.243:8000/'
// theme
export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#ffd100", // Change the underline color
    },
  };