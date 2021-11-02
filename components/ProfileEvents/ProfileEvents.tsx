import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileEvents = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Your events"} link={"/profile"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest ProfileEvents</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileEvents;
