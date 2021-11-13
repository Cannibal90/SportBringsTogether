import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const IconButton = (props: { iconName: any; text: any }) => {
  return (
    <View style={styles.button}>
      <Icon
        name={props.iconName}
        size={30}
        color={"#797979"}
        style={{ marginRight: 5 }}
      />
      <Text style={styles.textStyle}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default IconButton;
