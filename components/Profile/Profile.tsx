import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = (props: { history: any }) => {
  const labels = [
    {
      title: "Edit your profile",
      link: "/profile/edit",
    },
    {
      title: "Your events",
      link: "/profile/events",
    },
    {
      title: "Participating",
      link: "/profile/participating",
    },
    {
      title: "History",
      link: "/profile/history",
    },
    {
      title: "Trophies",
      link: "/profile/trophies",
    },
  ];

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Profile"}
        link={"/startpage"}
        icon={"sign-out"}
        history={props.history}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.profileContainer}
      >
        {labels.map((label, index) => {
          return (
            <Link key={index} to={label.link} component={TouchableOpacity}>
              <View style={styles.rectangle}>
                <Text style={styles.rectangleText}>{label.title}</Text>
                <Icon
                  name="chevron-right"
                  size={40}
                  color="#000000"
                  style={styles.iconContainer}
                />
              </View>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(196,196,196,0.28)",
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 350,
    height: 100,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rectangleText: {
    marginLeft: 20,
    fontWeight: "700",
    fontSize: 30,
  },
  iconContainer: {
    marginRight: 15,
  },
});

export default Profile;
