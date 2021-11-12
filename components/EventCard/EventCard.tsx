import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import EventModal from "../EventModal/EventModal";

const EventCard = (props: { event: any }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const link = require("../../images/running.jpg");

  const onModalVisibilityChange = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onModalVisibilityChange();
        }}
      >
        <ImageBackground source={link} style={styles.backgroundImage}>
          <View style={styles.circle}>
            <Text style={styles.eventText}>
              {props.event.eventDetails.title}
            </Text>
            <Text style={styles.eventText}>
              {props.event.eventDetails.place}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <EventModal
        visible={visible}
        onChange={onModalVisibilityChange}
        event={props.event}
      />
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
    fontSize: 14,
  },
});

export default EventCard;
