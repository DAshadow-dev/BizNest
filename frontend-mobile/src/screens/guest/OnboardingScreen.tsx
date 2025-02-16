import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Routes from "@utils/Routes";
import { navigate, useNavigationRoot } from "@components/navigate/RootNavigation";

const slides = [
  {
    id: 1,
    title: "Welcome to Our App",
    description: "Discover the best way to manage your business efficiently.",
    image: require("@assets/image/intro1.png"),
  },
  {
    id: 2,
    title: "Grow Your Business",
    description: "Automate and optimize your workflow for better performance.",
    image: require("@assets/image/intro2.png"),
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigationRoot();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          navigation.navigate(Routes.LOGIN_SCREEN); // Điều hướng đúng cách
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [navigation]); // Chỉ phụ thuộc vào navigation

  return (
    <View style={styles.container}>
      <Image source={slides[currentSlide].image} style={styles.image} />
      <Text style={styles.title}>{slides[currentSlide].title}</Text>
      <Text style={styles.description}>{slides[currentSlide].description}</Text>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 380,
    height: 380,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
});
