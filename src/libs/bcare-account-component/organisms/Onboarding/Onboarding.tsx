import React, { useRef } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from "react-native";
import { onboardingstyles } from "./Onborading.styles";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Define the type for the navigation prop
type RootStackParamList = {
  Onboarding: undefined;
};

type OnboardingScreenNavigationProp = NavigationProp<RootStackParamList, 'Onboarding'>;

const slides: {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
}[] = [
  {
    key: "one",
    title: "Welcome to SOCARE Hub",
    text: "Simplify your society life: Register, Vote, List, and Connect. Admins earn, members engage. Your society, your way.",
    image: require("../../../../../assets/onboardings/6850368.jpg"),
  },
  {
    key: "two",
    title: "Elevate Your Society Experience",
    text: "Seamless property management. Admins earn, create funds, and empower societies. Members access info, services, and community connections.",
    image: require("../../../../../assets/onboardings/10712.jpg"),
  },
  {
    key: "three",
    title: "Unlock SOCARE: Your Society's Powerhouse",
    text: "Unlock your society's potential. Admins earn, members connect, vote, list, and celebrate. SOCARE - Where community thrives.",
    image: require("../../../../../assets/onboardings/155473-OV6O7F-967.jpg"),
  },
];

const Onboarding: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const sliderRef = useRef<AppIntroSlider>(null);

  const renderNextButton = () => {
    return (
      <TouchableOpacity
        style={onboardingstyles.button}
        onPress={() => sliderRef.current?.goToSlide(sliderRef.current?.state.activeIndex + 1)}
      >
        <Text style={[onboardingstyles.buttonText, { color: "black" }]}>Next</Text>
      </TouchableOpacity>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity style={onboardingstyles.button} onPress={() => navigation.navigate('NextScreen')}>
        <Text style={[onboardingstyles.buttonText, { color: "black" }]}>Done</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", height: "60%" }}>
          <Image source={item.image} style={onboardingstyles.image} />
        </View>
        <Text style={onboardingstyles.title}>{item.title}</Text>
        <Text style={onboardingstyles.text}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={onboardingstyles.container}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={slides}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        dotStyle={{ backgroundColor: "#b5b5b5" }}
        activeDotStyle={{ backgroundColor: "#21465b", width: 30 }}
        showNextButton={true}
        showDoneButton={true}
      />
    </View>
  );
};

export default Onboarding;
