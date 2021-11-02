import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";

const SearchResults = () => {
  return (
    <View style={styles.container}>
      <TopContainer name={"Search"} link={"/search"} icon={false} />
      <Text style={{ marginTop: 200 }}>Tu jest searchResults</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchResults;
