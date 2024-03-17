import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Vibration,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Platform } from "react-native";
import { TextInput, DefaultTheme, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  FontSize,
  FontFamily,
  Color,
  Margin,
  Border,
  Padding,
} from "../../../../../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../apps/constants";
import { SignupService } from "../../services/account.services";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { signupstyles } from "./Signup.styles";
import useButtonAnimation from "../../molecules/UseButtonAnimation/UseButtonAnimation";

interface FormData {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

const Signup: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    phone_number: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "SOCIETY",
  });
  const [error, setError] = useState("");
  const [buttonAnimation] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorphoneNumber, setErrorphoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Use the custom hook to get the animated style
  const animatedStyle = useButtonAnimation();

  const validateMobileNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber.trim()) {
      setError("Mobile field is required.");
      return false;
    }

    const isNumeric = /^[0-9]+$/.test(phoneNumber);
    if (!isNumeric) {
      setError("Mobile field should contain numbers only.");
      return false;
    }

    if (phoneNumber.length !== 10) {
      setError("Mobile number should contain exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleRegistration = async () => {
    if (!validateMobileNumber(formData?.phone_number)) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await SignupService({
        phone_number: formData?.phone_number,
        user_type: "CUSTOMER",
      });
      // console.log("response", response?.data);
      // console.log("response_details", response?.data?.details);
      // console.log("response_access_token", response?.data?.token?.access);
      // console.log("response_refresh_token", response?.data?.token?.refresh);
      // console.log("response_status", response?.status);
      if (response?.data?.token?.access) {
        console.log("success");
        navigation.navigate("Otp", { phoneNumber: formData.phone_number, responsePayload:response?.data });
      } else {
        setError("Something went wrong during signup.");
      }
    } catch (error) {
      Vibration.vibrate([0, 0, 0, 400]);
      if (error.response) {
        console.log(error.response.data);
        const statusCode: number = error.response.status;
        const responseData: any = error.response.data;
        if (statusCode === 404) {
          setError("User with this phone number does not exist.");
        } else if (statusCode === 401) {
          setError(
            "User with this phone number is not active. Please signup and verify OTP."
          );
        } else {
          setError("Server Error.");
        }
      } else {
        console.error("Network error or other exception:", error.message);
        setError("Network error or other exception occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, phone_number: value }));
    if (errorphoneNumber && value.length > 0) {
      setErrorphoneNumber("");
    } else if (message && value.length > 0) {
      setMessage("");
    }
  };
  return (
    <View style={signupstyles.maincont}>
      <SafeAreaView style={signupstyles.safearealog}>
        <View style={signupstyles.iconview}>
          {/* <TouchableOpacity 
      // onPress={() => navigation.goBack()} 
      style={signupstyles.icontouch}>
      <Icon name="keyboard-backspace" size={28} />
      <Image source={require('../assets/logo11.png')} style={signupstyles.logoo} />
      </TouchableOpacity> */}
        </View>
        <Text style={[signupstyles.suppliertxt, { paddingTop: 20 }]}>
          SignUp Portal
        </Text>
        <Text style={[signupstyles.logintxt, { paddingBottom: 20 }]}>
          Welcome to SOCARE
        </Text>
        <View style={signupstyles.imgview}>
          <Image
            source={require("../../../../../assets/onboardings/10712.jpg")}
            style={signupstyles.imgg2}
          />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={[signupstyles.bottomview, { padding: Padding.p_41xl }]}>
          <View style={{ display: "flex", marginBottom: 8 }}>
            <TextInput
              style={signupstyles.inputview}
              label="Mobile*"
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              theme={theme}
              mode="flat"
              value={formData.phone_number}
              returnKeyType="done"
              onChangeText={handlePhoneNumberChange}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons name="" size={20} color="gray" />
                  )}
                />
              }
              maxLength={10}
            />
            {error && (
              <Text style={signupstyles.error}>
                <Entypo name="cross" size={18} color="red" />
                {error}
              </Text>
            )}

            <TouchableOpacity
              style={[signupstyles.loginbtn, animatedStyle]}
              onPress={handleRegistration}
              activeOpacity={0.8}
              disabled={isLoading} // Disable the button when loading is true
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={signupstyles.logintxt}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={signupstyles.signview}>
            <Text style={signupstyles.already}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={signupstyles.alreadylog}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;
