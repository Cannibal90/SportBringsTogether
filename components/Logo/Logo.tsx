import React from "react";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Logo = () => {
  return (
    <LinearGradient
      colors={["#FC8E67", "#FDCC4E"]}
      style={styles.iconContainer}
    >
      <Image source={require("../../images/Logo.png")} style={styles.logo} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default Logo;
