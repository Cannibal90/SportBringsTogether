import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileTrophies = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Trophies"} link={"/profile"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest ProfileTrophies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileTrophies;
