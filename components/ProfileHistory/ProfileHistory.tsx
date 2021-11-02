import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileHistory = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"History"} link={"/profile"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest ProfileHistory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileHistory;
