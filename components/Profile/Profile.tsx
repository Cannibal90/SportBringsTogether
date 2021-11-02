import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";

const Profile = () => {
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
      <TopContainer name={"Profile"} link={"/startpage"} icon={false} />
      <View style={styles.profileContainer}>
        {labels.map((label, index) => {
          return (
            <Link key={index} to={label.link} component={TouchableOpacity}>
              <Text style={{ margin: 20 }}>{label.title}</Text>
            </Link>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
