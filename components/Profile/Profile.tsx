import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
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
