import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ActivityDetails = () => {
  return (
    <View style={styles.container}>
      <TopContainer
        name={"Activity details"}
        link={"/startpage"}
        icon={false}
      />
      <Text style={{ marginTop: 200 }}>Tu jest ActivityDetails</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ActivityDetails;
