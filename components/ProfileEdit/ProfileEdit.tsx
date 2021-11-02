import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileEdit = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Edit profile"} link={"/profile"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest ProfileEdit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileEdit;
