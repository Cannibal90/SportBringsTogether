import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 200 }}>Tu jest search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
