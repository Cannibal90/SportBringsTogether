import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";
import IconButton from "../IconButton/IconButton";

const EventModal = (props: {
  visible: any;
  onChange: any;
  event: any;
  type: any;
  editable: any;
}) => {
  const [eventInfo, setEventInfo] = useState<any>({
    title: props.event.eventDetails.title || "",
    description: props.event.eventDetails.description || "",
    startDate: props.event.eventDetails.startDate.toString() || "",
    endDate: props.event.eventDetails.endDate.toString() || "",
    lastTimeRegistration:
      props.event.eventDetails.lastTimeRegistration.toString() || "",
    maxAttendants: props.event.eventDetails.maxAttendants.toString() || "",
    place: props.event.eventDetails.place || "",
  });

  const handleChange = (item: any, name: any) => {
    setEventInfo({
      ...eventInfo,
      [name]: item,
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.onChange();
        }}
      >
        <View style={styles.centeredView}>
          <LinearGradient
            colors={["#FC8E67", "#FDCC4E"]}
            style={styles.modalView}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                label="Title"
                value={eventInfo.title}
                onChangeText={(text: any) => handleChange(text, "title")}
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="Description"
                value={eventInfo.description}
                onChangeText={(text: any) => handleChange(text, "description")}
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="Start date"
                value={eventInfo.startDate}
                onChangeText={(text: any) => handleChange(text, "startDate")}
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="End date"
                value={eventInfo.endDate}
                onChangeText={(text: any) => handleChange(text, "endDate")}
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="Time to register"
                value={eventInfo.lastTimeRegistration}
                onChangeText={(text: any) =>
                  handleChange(text, "lastTimeRegistration")
                }
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="Max attendants"
                value={eventInfo.maxAttendants}
                onChangeText={(text: any) =>
                  handleChange(text, "maxAttendants")
                }
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
              <TextInput
                style={styles.input}
                label="Place"
                placeholder="Place"
                value={eventInfo.place}
                onChangeText={(text: any) => handleChange(text, "place")}
                activeUnderlineColor={"#000000"}
                disabled={props.editable}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              {(props.type === "startpage" || props.type === "history") && (
                <Pressable onPress={() => props.onChange()}>
                  <IconButton iconName="check-circle" text="OK" />
                </Pressable>
              )}

              {props.type === "startpage" && (
                <Link
                  to={`/map/${props.event.id}/${props.event.latitude}/${props.event.longitude}`}
                >
                  <IconButton iconName="map" text="Go to Map" />
                </Link>
              )}

              {props.type === "participating" && (
                <Pressable onPress={() => props.onChange()}>
                  <IconButton iconName="trash" text="Discard" />
                </Pressable>
              )}

              {props.type === "profile" && (
                <Pressable onPress={() => props.onChange()}>
                  <IconButton iconName="edit" text="Edit" />
                </Pressable>
              )}
              {props.type === "profile" && (
                <Pressable onPress={() => props.onChange()}>
                  <IconButton iconName="trash" text="Delete" />
                </Pressable>
              )}
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: 480,
    borderRadius: 20,
    padding: 35,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  input: {
    fontWeight: "700",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
});

export default EventModal;
