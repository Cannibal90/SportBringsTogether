import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";

const BottomContainer = () => {
  return (
    <View style={styles.container}>
      <Link component={TouchableOpacity} to={"/startpage"}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imageWrapper}
            source={require("../../images/home.png")}
          />
          <Text style={styles.iconText}>Home</Text>
        </View>
      </Link>

      <Link component={TouchableOpacity} to={"/map"}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imageWrapper}
            source={require("../../images/search.png")}
          />
          <Text style={styles.iconText}>Map</Text>
        </View>
      </Link>

      <Link component={TouchableOpacity} to={"/profile"}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imageWrapper}
            source={require("../../images/profile.png")}
          />
          <Text style={styles.iconText}>Profile</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.25)",
  },
  imageWrapper: {
    marginHorizontal: 20,
    height: 40,
    width: 40,
  },
  iconText: {
    marginHorizontal: 20,
    color: "#545454",
    fontSize: 10,
  },
});

export default BottomContainer;
