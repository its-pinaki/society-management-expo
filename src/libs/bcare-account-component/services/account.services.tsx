import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootEndPoint } from "../../../apps/constants";
import { useAuthStore } from "../stores/account.stores";

// Function to make sign up API call
export const SignupService = async (userData: {
  phone_number: string;
  user_type: string;
}) => {
  try {
    const response = await axios.post(
      `${rootEndPoint}/api/account/register/`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to make sign up API call
export const VerifyOtp = async (userData: {
  phone_number: string;
  otp_code: Number;
  payload: any;
}) => {
  try {
    const response = await axios.post(
      `${rootEndPoint}/api/account/verifyotp/`,
      {
        phone_number:userData?.phone_number,
        otp_code:userData?.otp_code,
      }
    );
    // After successful signup and verify otp , set tokens in the store
    useAuthStore.getState().setTokens(payload?.token?.access, payload?.token?.refresh, payload?.details?.id);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to make sign up API call
export const RegenerateOtp = async (userData: { phone_number: string }) => {
  try {
    const response = await axios.post(
      `${rootEndPoint}/api/account/regenerateotp/`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to make sign up API call
export const LoginService = async (userData: {
  phone_number: string;
  user_type: string;
}) => {
  console.log(userData);
  try {
    const response = await axios.post(
      `${rootEndPoint}/api/account/login-with-otp/`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to make sign up API call
export const LogOut = async () => {
  try {
    //clear token,userid
  } catch (error) {
    throw error;
  }
};

// Function to make login API call
// export const Login = async (userData: userEntryPayload) => {
//   try {
//     const response = await axios.post(`${apiUrl}/api/account/login/`, userData);

//     // Set authentication token in cookie
//     setCookie(null, "authToken", response.data.access, {
//       path: "/",
//       maxAge: 30 * 24 * 60 * 60,
//     });

//     // Update authentication state
//     useAccountStore.getState().setIsAuthenticated(true);

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// // Function to logout
// export const Logout = () => {
//   // Clear authentication token from cookie
//   destroyCookie(null, "authToken");

//   // Update authentication state
//   useAccountStore.getState().setIsAuthenticated(false);
// };

// // Function to get profile details using bearer token
// export const getProfileDetails = async () => {
//   try {
//     // Fetch authentication token from cookie
//     const authToken = parseCookies().authToken;

//     if (!authToken) {
//       throw new Error("Authentication token not found.");
//     }

//     // Make API request with bearer token
//     const response = await axios.get(`${apiUrl}/api/account/profile/`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
