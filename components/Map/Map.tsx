import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import TopContainer from "../TopContainer/TopContainer";

const Map = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Map"} link={"/startpage"} icon={true} />
      <View style={styles.mapContainer}>
        <Text>Tu jest Map</Text>
        <Link
          to={"/map/create"}
          component={TouchableOpacity}
          style={styles.floatButton}
        >
          <LinearGradient
            colors={["#FC8E67", "#FDCC4E"]}
            style={styles.addIcon}
          >
            <Icon name="plus" size={60} color={"#ffffff"} />
          </LinearGradient>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default Map;
