import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FC8E67", "#FDCC4E"]}
        style={styles.iconContainer}
      >
        <Image source={require("../../images/Logo.png")} style={styles.logo} />
      </LinearGradient>

      <View style={styles.buttonContainer}>
        <Link to={"/login"} component={TouchableOpacity}>
          <LinearGradient colors={["#FC8E67", "#FDCC4E"]} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </LinearGradient>
        </Link>
        <Link to={"/register"} component={TouchableOpacity}>
          <LinearGradient colors={["#FC8E67", "#FDCC4E"]} style={styles.button}>
            <Text style={styles.buttonText}>Create account</Text>
          </LinearGradient>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  iconContainer: {
    width: "100%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
  button: {
    borderRadius: 20,
    marginTop: 20,
    width: 330,
    height: 70,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default WelcomePage;
