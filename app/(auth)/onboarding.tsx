import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { onboarding } from "@/constants";

import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnboardingScreen = () => {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className="flex-1 bg-black">
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => setCurrentIndex(index)}
        showsPagination={false}
      >
        {onboarding.map((item, index) => (
          <View className="flex-1 items-center justify-center" key={item.id}>
            {/* Fullscreen Background Image */}
            <Image
              source={item.image}
              className="absolute w-full h-full"
              resizeMode="cover"
            />
            {/* Dark overlay for better text visibility */}
            <View className="absolute bg-black/60 w-full h-full" />

            {/* Animated Content */}
            {currentIndex === index ? (
              <Animated.View
                entering={FadeInDown.duration(800).delay(200)}
                className="w-full px-5 flex items-center mt-20"
              >
                <Text className="text-center text-4xl font-extrabold text-white">
                  {item.title}
                </Text>
                <Text className="text-center text-lg mt-5 text-gray-200">
                  {item.description}
                </Text>
              </Animated.View>
            ) : (
              <View className="w-full px-5 flex items-center mt-20 opacity-0">
                <Text className="text-center text-4xl font-extrabold text-white">
                  {item.title}
                </Text>
                <Text className="text-center text-lg mt-5 text-gray-200">
                  {item.description}
                </Text>
              </View>
            )}
          </View>
        ))}
      </Swiper>

      {/* Floating Top Header Section */}
      <SafeAreaView className="absolute top-0 w-full flex-row-reverse items-center justify-between p-6">
        <Button
          onPress={() => {
            router.replace("./sign-up");
          }}
          className="bg-white/20 px-5 py-2 rounded-full"
        >
          <Text className="font-bold text-base text-white">Skip</Text>
        </Button>
        <ThemeToggle />
      </SafeAreaView>

      {/* Floating Bottom Navigation / Call to Action */}
      <SafeAreaView className="absolute bottom-5 w-full flex items-center pb-5">
        <View className="flex-row mb-6 items-center justify-center">
          {onboarding.map((_, idx) => (
            <View
              key={idx}
              className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-10 bg-inherit " : "w-3 bg-gray-500"
              }`}
            />
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(400)}
          className="w-11/12 relative"
        >
          <Button
            className="w-full h-14 rounded-full bg-inherit flex items-center justify-center shadow-lg shadow-black/50"
            onPress={() => {
              if (currentIndex === onboarding.length - 1) {
                router.replace("./sign-up");
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}
          >
            <Text className="text-white font-bold text-xl tracking-wide">
              {currentIndex === onboarding.length - 1
                ? "Get Started"
                : "Continue"}
            </Text>
          </Button>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
