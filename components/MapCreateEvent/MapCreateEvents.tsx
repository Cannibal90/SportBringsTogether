import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "../IconButton/IconButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { EventRequest } from "../../models/EventInterfaces";
import { TextInput } from "react-native-paper";

const MapCreateEvents = (props: {
  visible: any;
  onChange: any;
  coordinates: any;
  place: any;
}) => {
  const [event, setEvent] = useState<EventRequest>({
    longitude: 0,
    latitude: 0,
    description: "",
    place: "",
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    maxAttendants: 0,
    lastTimeRegistration: new Date(),
    creatorId: 0,
  });

  useEffect(() => {
    if (props.coordinates) {
      setEvent({
        ...event,
        longitude: props.coordinates.longitude,
        latitude: props.coordinates.latitude,
      });
    }
  }, [props.coordinates]);

  const handleChange = (item: any, name: any) => {
    setEvent({
      ...event,
      [name]: item,
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.onChange();
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={props.onChange}>
            <View style={styles.closeContainer}></View>
          </TouchableWithoutFeedback>
          <View style={styles.eventHeadlineContainer}>
            <Text style={styles.eventHeadlineTitleText}>{props.place}</Text>

            <View style={styles.eventHeadlineLatLogContainer}>
              <Text style={styles.eventHeadlineLatLog}>{event.latitude}</Text>
              <Text style={styles.eventHeadlineLatLog}>{event.longitude}</Text>
            </View>
          </View>

          <LinearGradient
            colors={["#FC8E67", "#FDCC4E"]}
            style={styles.modalView}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                style={styles.input}
                label="Title"
                value={event.title}
                onChangeText={(text: any) => handleChange(text, "title")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Start date"
                value={event.startDate.toString()}
                onChangeText={(text: any) => handleChange(text, "startDate")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="End date"
                value={event.endDate.toString()}
                onChangeText={(text: any) => handleChange(text, "endDate")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Max attendants"
                value={event.maxAttendants.toString()}
                onChangeText={(text: any) =>
                  handleChange(text, "maxAttendants")
                }
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Last time to register"
                value={event.lastTimeRegistration.toString()}
                onChangeText={(text: any) =>
                  handleChange(text, "lastTimeRegistration")
                }
                activeUnderlineColor={"#000000"}
              />
              <View style={styles.lastButtonContainer}>
                <IconButton iconName="save" text="Create" />
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  closeContainer: {
    height: 600,
    width: "100%",
  },
  eventHeadlineContainer: {
    marginBottom: 10,
    width: "95%",
    height: 80,
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 35,
    backgroundColor: "#f7f7f7",
  },
  eventHeadlineTitleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  eventHeadlineLatLogContainer: {
    flexDirection: "row",
  },
  eventHeadlineLatLog: {
    paddingRight: 10,
    color: "#5e5e5e",
  },
  modalView: {
    marginBottom: 60,
    width: "95%",
    height: 300,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 15,
  },
  lastButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  input: {
    fontWeight: "700",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
  },
});

export default MapCreateEvents;
