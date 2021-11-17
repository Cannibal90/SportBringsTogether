import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const CreateEvent = (props: { history: any }) => {
  return (
    <View style={styles.container}>
      <TopContainer
        name={"Create event"}
        link={"/map"}
        icon={false}
        history={props.history}
      />
      <Text style={{ marginTop: 200 }}>Tu jest CreateEvent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateEvent;
