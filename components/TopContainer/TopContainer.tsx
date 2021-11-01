import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";

const TopContainer = (props: { name: any; link: any; icon: any }) => {
  return (
    <LinearGradient colors={["#FC8E67", "#FDCC4E"]} style={styles.container}>
      <Link
        component={TouchableOpacity}
        to={props.link}
        style={styles.imageLink}
      >
        <Image
          style={styles.arrow}
          source={require("../../images/arrow.png")}
        />
      </Link>
      <Text style={styles.topText}>{props.name}</Text>
      <Image
        style={styles.search}
        source={require("../../images/search_light.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
  },
  topText: {
    marginTop: "8%",
    marginHorizontal: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
  },
  arrow: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  imageLink: {
    marginTop: "8%",
  },
  search: {
    marginTop: "8%",
    width: 40,
    height: 40,
    marginLeft: "45%",
  },
});

export default TopContainer;
