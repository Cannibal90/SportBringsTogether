import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileParticipating = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Participating"} link={"/profile"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest ProfileParticipating</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileParticipating;
