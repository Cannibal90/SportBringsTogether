import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import MainRouting from "./MainRouting";
import BottomContainer from "../BottomContainer/BottomContainer";
import { StatusBar } from "expo-status-bar";
import { store } from "../../store/store";

const MainContainer = () => {
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setLogged(store.getState().loggedReducer.logged);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MainRouting />
      {/* <KeyboardAvoidingView behavior={"padding"} style={styles.container}> */}
      {logged && <BottomContainer />}
      {/* </KeyboardAvoidingView> */}
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
