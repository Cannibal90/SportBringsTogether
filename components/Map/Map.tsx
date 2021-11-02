import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const Map = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Search"} link={"/startpage"} icon={"search"} />
      <Text style={{ marginTop: 200 }}>Tu jest map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
