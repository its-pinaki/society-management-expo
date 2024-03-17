import { useState, useEffect } from "react";
import { Animated } from "react-native";

const useButtonAnimation = () => {
  const [buttonAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    // Configure the animation
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonAnimation, {
          toValue: 0.9,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [buttonAnimation]);

  const animatedStyle = {
    transform: [{ scale: buttonAnimation }],
  };

  return animatedStyle;
};

export default useButtonAnimation;
