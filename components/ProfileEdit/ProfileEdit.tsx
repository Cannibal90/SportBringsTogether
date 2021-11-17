import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const ProfileEdit = (props: { history: any }) => {
  return (
    <View style={styles.container}>
      <TopContainer
        name={"Edit profile"}
        link={"/profile"}
        icon={false}
        history={props.history}
      />
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
