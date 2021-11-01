import React from "react";
import { View, StyleSheet } from "react-native";
import MainRouting from "./MainRouting";
import BottomContainer from "../BottomContainer/BottomContainer";

const MainContainer = () => {
  return (
    <View style={styles.container}>
      <MainRouting />
      <BottomContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventCardsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  eventHeadline: {
    marginTop: 10,
    marginLeft: "10%",
    fontSize: 30,
    fontWeight: "700",
  },
});

export default MainContainer;
