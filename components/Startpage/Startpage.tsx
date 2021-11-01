import React from "react";
import { Text, View, StyleSheet } from "react-native";
import EventCard from "../EventCard/EventCard";
import Logo from "../Logo/Logo";

const Startpage = () => {
  const events = [
    {
      title: "Running",
      place: "Lodz, Czajkowskiego 14",
      link: require("../../images/running.jpg"),
    },
    {
      title: "Volleyball",
      place: "Lodz, Czajkowskiego 14",
      link: require("../../images/volleyball.jpg"),
    },
    {
      title: "Football",
      place: "Lodz, Czajkowskiego 14",
      link: require("../../images/football.jpg"),
    },
  ];
  const tab = [1, 2, 3];

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.eventHeadline}>Events in nearbly area</Text>
      <View style={styles.eventCardsContainer}>
        {events.map((event, index) => {
          return <EventCard key={index} event={event} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventCardsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  eventHeadline: {
    marginTop: 10,
    marginLeft: "10%",
    fontSize: 30,
    fontWeight: "700",
  },
});

export default Startpage;
