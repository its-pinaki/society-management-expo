import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Vibration,
  Image,
  Platform,
  Animated,
} from "react-native";
import * as Speech from "expo-speech";
import { SafeAreaView } from "react-native-safe-area-context";
import { VerifyOtp, RegenerateOtp } from "../../services/account.services";
import { useRoute, CommonActions } from "@react-navigation/native";
import { otpstyles } from "./Otp.styles";
import { Padding } from "../../../../../GlobalStyles";
import { useAuthStore } from "../../stores/account.stores";

interface RouteParams {
  phoneNumber: string;
}

const Otp: React.FC = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const animationValues = useRef<Animated.Value[]>(
    otp.map(() => new Animated.Value(0))
  );
  const [disableResend, setDisableResend] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showMaxAttemptMessage, setShowMaxAttemptMessage] =
    useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRoute();
  const { phoneNumber, responsePayload } = route.params as RouteParams;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    Speech.speak("", { language: "hin", rate: 0.8 });
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    startCountdown();
  }, []);

  const startCountdown = () => {
    setDisableResend(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setDisableResend(false);
    }, 60000);
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<TextInput>, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputs.current[index - 1]?.focus();
      animationValues.current[index].setValue(0);
    }

    if (e.nativeEvent.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputs.current[index]?.clear();
      animationValues.current[index].setValue(0);
      setError(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setDisableResend(true);
      setDisableButton(true);
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const response = await RegenerateOtp(phoneNumber);
      if (response === "Successfully regenerated the new OTP") {
        setDisableResend(false);
        setDisableButton(false);
        setCountdown(60);
      } else {
        setDisableResend(false);
        setDisableButton(false);
      }

      setTimeout(() => {
        clearInterval(timer);
        setDisableResend(false);
        setDisableButton(false);
      }, 60000);
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };

  useEffect(() => {
    animateFields();
  }, [otp]);

  const animateFields = async () => {
    setIsLoading(true);

    const animations = otp.map((value, index) => {
      return Animated.timing(animationValues.current[index], {
        toValue: value === "" ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      });
    });

    Animated.parallel(animations).start();

    if (otp.every((value) => value !== "")) {
      const enteredOtp = otp.join("");

      try {
        const otpData = {
          phone_number: phoneNumber,
          otp_code: enteredOtp,
          payload: responsePayload,
        };
        console.log(otpData);
        const response = await VerifyOtp(otpData);
        console.log("verifyotpresponse", response);
        console.log("isLoggedIn", isLoggedIn);
        // if (response.detail === "user verified") {
        //   console.log("OTP verification successful");
        //   navigation.dispatch(
        //     CommonActions.reset({
        //       index: 0,
        //       routes: [{ name: "LoginRole" }],
        //     })
        //   );
        // } else {
        //   setError(true);
        //   Vibration.vibrate([0, 0, 0, 400]);
        //   Speech.speak("Incorrect OTP. Please try again.");
        //   console.log("OTP verification failed:", response);
        // }
      } catch (error) {
        // setError(true);
        // Vibration.vibrate([0, 0, 0, 400]);
        // Speech.speak("Incorrect OTP. Please try again.");
        // console.log("OTP verification failed:", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <View style={otpstyles.container1}>
      <View style={otpstyles.maincont}>
        <SafeAreaView style={otpstyles.safeareaotp}>
          <View style={otpstyles.iconview}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={otpstyles.icontouch}
            />
          </View>
          <View style={[otpstyles.imgview]}>
            <Image
              source={require("../../../../../assets/onboardings/10712.jpg")}
              style={otpstyles.imgg2}
            />
          </View>
        </SafeAreaView>
        <View style={[otpstyles.bottomview]}>
          <View style={[otpstyles.container3, { paddingTop: Padding.p_36xl }]}>
            {otp.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  otpstyles.inputContainer,
                  {
                    transform: [
                      {
                        translateY: animationValues.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -40],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TextInput
                  style={otpstyles.inputotp}
                  value={value}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  returnKeyType="done"
                  keyboardType="numeric"
                  ref={(ref) => (inputs.current[index] = ref)}
                  //   editable={!disableInput}
                />
              </Animated.View>
            ))}
          </View>
          <View style={otpstyles.buttonContainer1}>
            {disableResend ? (
              <Text>OTP valid for {countdown} seconds</Text>
            ) : (
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={disableButton}
              >
                <Text style={otpstyles.alreadylog}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          {error ? (
            <Text style={otpstyles.errorText}>
              Invalid OTP. Please try again.
            </Text>
          ) : null}

          {otp.every((value) => value !== "") && (
            <View style={otpstyles.loadingContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#ffd100" />
              ) : null}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Otp;
