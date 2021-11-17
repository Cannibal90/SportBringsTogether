import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { store } from "../../store/store";
import { logOut } from "../../store/actions/LoggedAction";

const TopContainer = (props: {
  name: any;
  link: any;
  icon: any;
  history: any;
}) => {
  const handlePush = () => {
    if (props.icon === "search") {
      props.history.push("search");
    } else {
      store.dispatch(logOut());
      props.history.push("welcome");
    }
  };

  return (
    <LinearGradient colors={["#FC8E67", "#FDCC4E"]} style={styles.container}>
      <Link
        component={TouchableOpacity}
        to={props.link}
        style={styles.imageLink}
      >
        <Image
          style={styles.arrow}
          source={require("../../images/arrow.png")}
        />
      </Link>
      <Text style={styles.topText}>{props.name}</Text>
      {props.icon && (
        <TouchableOpacity
          onPress={() => {
            handlePush();
          }}
        >
          <Icon
            name={props.icon}
            size={40}
            color={"#ffffff"}
            style={[
              styles.imageLink,
              { marginLeft: props.icon === "search" ? "67%" : "63%" },
            ]}
          />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
  },
  topText: {
    marginTop: "8%",
    marginHorizontal: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
  },
  arrow: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  imageLink: {
    marginTop: "11%",
  },
});

export default TopContainer;
