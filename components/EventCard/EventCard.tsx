import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import EventModal from "../EventModal/EventModal";
import { eventCardImages } from "./EventCardImages";

const EventCard = (props: { event: any; modalType: any; onSave?: any }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const filteredEventImages = eventCardImages.filter((ev) => {
    if (ev.names.includes(props.event.eventDetails.title.toLowerCase()))
      return true;
  });
  const link = filteredEventImages.length
    ? filteredEventImages[0].url
    : eventCardImages[16].url;

  const onModalVisibilityChange = () => {
    setVisible(!visible);
  };

  return (
    <View>
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
        type={props.modalType}
        visible={visible}
        onChange={onModalVisibilityChange}
        event={props.event}
        onSave={props.onSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 330,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
  },
  circle: {
    marginLeft: -30,
    width: 135,
    height: "100%",
    borderRadius: 1000,
    backgroundColor:
      "linear-gradient(73.71deg, rgba(0, 0, 0, 0.65) 29.86%, rgba(0, 0, 0, 0) 115.69%);",
    justifyContent: "center",
  },
  eventText: {
    marginLeft: 35,
    color: "#ffffff",
    fontSize: 14,
  },
});

export default EventCard;
