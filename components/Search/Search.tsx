import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";

const Search = (props: { history: any }) => {
  return (
    <View style={styles.container}>
      <TopContainer
        name={"Search"}
        link={"/map"}
        icon={false}
        history={props.history}
      />
      <View style={styles.searchContainer}>
        <Link to={"/search/results"} component={TouchableOpacity}>
          <Text>Tu jest search</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
