import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";

const EventCard = (props: { event: any }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={props.event.link} style={styles.backgroundImage}>
        <View style={styles.circle}>
          <Text style={styles.eventText}>{props.event.title}</Text>
          <Text style={styles.eventText}>{props.event.place}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "20%",
    marginTop: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  circle: {
    marginLeft: -30,
    width: 135,
    height: "100%",
    borderRadius: 1000,
    backgroundColor:
      "linear-gradient(73.71deg, rgba(0, 0, 0, 0.8) 29.86%, rgba(0, 0, 0, 0) 115.69%);",
    justifyContent: "center",
  },
  eventText: {
    marginLeft: 35,
    color: "#ffffff",
    fontSize: 10,
  },
});

export default EventCard;
