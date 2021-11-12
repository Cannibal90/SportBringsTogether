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

const EventModal = (props: { visible: any; onChange: any; event: any }) => {
  const [eventInfo, setEventInfo] = useState<any>({
    title: "",
    description: "",
    startDate: "",
    maxAttendants: "",
    place: "",
  });

  const handleChange = (item: any, name: any) => {
    console.log(item);
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
              />
              <TextInput
                style={styles.input}
                label="Description"
                value={eventInfo.discription}
                onChangeText={(text: any) => handleChange(text, "description")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Start date"
                value={eventInfo.startDate}
                onChangeText={(text: any) => handleChange(text, "startDate")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Max attendants"
                value={eventInfo.maxAttendants}
                onChangeText={(text: any) =>
                  handleChange(text, "maxAttendants")
                }
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Place"
                placeholder="Place"
                value={eventInfo.place}
                onChangeText={(text: any) => handleChange(text, "place")}
                activeUnderlineColor={"#000000"}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={() => props.onChange()}>
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              <Link to={"/map/event"} style={styles.button}>
                <Text style={styles.textStyle}>Go to Map</Text>
              </Link>
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
  button: {
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
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
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
});

export default EventModal;
