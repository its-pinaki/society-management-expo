import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Pressable,
  Text,
  View,
  Image,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Platform } from "react-native";
import { TextInput, DefaultTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { loginstyles } from "./Login.styles";
import { LoginService } from "../../services/account.services";
import { useAuthStore } from "../../stores/account.stores";
import { theme } from "../../../../apps/constants";
import useButtonAnimation from "../../molecules/UseButtonAnimation/UseButtonAnimation";

interface LoginProps {}
interface NavigateParams {
  phoneNumber?: string;
}

const Login: React.FC<LoginProps> = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<{ phoneNumber: string }>({
    phoneNumber: "",
  });
  const [error, setError] = useState<string>("");
  const [buttonAnimation] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  
  // Use the custom hook to get the animated style
  const animatedStyle = useButtonAnimation();
  console.log("isLoggedIn", isLoggedIn);

  const handleTextInputChange = useCallback(
    (value: string) => {
      setFormData((formData) => ({
        ...formData,
        phoneNumber: value,
      }));
    },
    [setFormData]
  );

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

  const handleLogin = async (): Promise<void> => {
    if (!validateMobileNumber(formData?.phoneNumber)) {
      return;
    }
    console.log(formData);
    try {
      setIsLoading(true);
      const response = await LoginService({
        phone_number: formData?.phoneNumber,
        user_type: "CUSTOMER",
      });
      if (response.status === 200) {
        console.log("success");
        // navigation.navigate<NavigateParams>("LogOtp", {
        //   phoneNumber: formData?.phoneNumber,
        // });
      } else {
        setError("Something went wrong during login.");
      }
    } catch (error) {
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

  return (
    <View style={loginstyles.maincont}>
      <SafeAreaView style={loginstyles.safearealog}>
        <Text style={[loginstyles.suppliertxt, { paddingTop: 20 }]}>
          Login Portal
        </Text>
        <Text style={[loginstyles.logintxt, { paddingBottom: 20 }]}>
          Welcome to SOCARE
        </Text>
        <View style={loginstyles.imgview}>
          <Image
            source={require("../../../../../assets/onboardings/10712.jpg")}
            style={loginstyles.imgg2}
          />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={[loginstyles.bottomview, { padding: 20 }]}>
          <View style={{ display: "flex", marginBottom: 8 }}>
            <TextInput
              style={loginstyles.inputview}
              label="Mobile*"
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              theme={theme}
              mode="flat"
              value={formData?.phoneNumber}
              onChangeText={handleTextInputChange}
              left={
                <TextInput.Icon
                  name={() => (
                    <MaterialCommunityIcons
                      name="cellphone"
                      size={20}
                      color="gray"
                    />
                  )}
                />
              }
              maxLength={10}
            />
            {error && (
              <Text style={loginstyles.error}>
                <Entypo name="cross" size={18} color="red" />
                {error}
              </Text>
            )}

            <TouchableOpacity
              style={[loginstyles.loginbtn, animatedStyle]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={loginstyles.logintxt}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={loginstyles.signview}>
            <Text style={loginstyles.already}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={loginstyles.alreadylog}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
