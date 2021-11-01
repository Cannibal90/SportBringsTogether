import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const Profile = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Profile"} link={"/startpage"} icon={"profile"} />
      <Text style={{ marginTop: 200 }}>Tu jest profil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
