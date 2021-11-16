import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MainRouting from "./MainRouting";
import BottomContainer from "../BottomContainer/BottomContainer";
import { StatusBar } from "expo-status-bar";
import { store } from "../../store/store";

const MainContainer = () => {
  const [logged, setLogged] = useState<boolean>(false);

  store.subscribe(() => {
    console.log(store.getState().loggedReducer.logged);
    setLogged(store.getState().loggedReducer.logged);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MainRouting />
      {logged && <BottomContainer />}
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
