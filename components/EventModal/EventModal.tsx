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
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";
import IconButton from "../IconButton/IconButton";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { EventRespone } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import { store } from "../../store/store";
const EventModal = (props: {
  visible: any;
  onChange: any;
  event: any;
  type: any;
  onSave?: any;
}) => {
  const [eventInfo, setEventInfo] = useState<any>({
    latitude: props.event.latitude,
    longitude: props.event.longitude,
    description: props.event.eventDetails.description || "",
    place: props.event.eventDetails.place || "",
    title: props.event.eventDetails.title || "",
    startDate: new Date(...props.event.eventDetails.startDate) || new Date(),
    endDate: new Date(...props.event.eventDetails.endDate) || new Date(),
    maxAttendants: props.event.eventDetails.maxAttendants || "",
    lastTimeRegistration:
      new Date(...props.event.eventDetails.lastTimeRegistration) || new Date(),
    creatorId: props.event.creatorId,
    tags: props.event.tags.toString(),
  });
  const [editable, setEditable] = useState<boolean>(false);
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showLastTimeRegistration, setShowLastTimeRegistration] =
    useState<boolean>(false);
  const userId = store.getState().loggedReducer.id;

  const eventService = new EventService();

  const handleChange = (item: any, name: any) => {
    if (name === "startDate") {
      handleShowStartDate();
    } else if (name === "endDate") {
      handleShowEndDate();
    } else if (name === "lastTimeRegistration") {
      handleShowLastTimeRegistration();
    } else if (name === "maxAttendants") {
      item = Number.parseInt(item);
    }

    setEventInfo({
      ...eventInfo,
      [name]: item,
    });
  };

  const handleEditable = () => {
    setEditable(!editable);
  };

  const handleShowStartDate = () => {
    setShowStartDate(!showStartDate);
  };
  const handleShowEndDate = () => {
    setShowEndDate(!showEndDate);
  };
  const handleShowLastTimeRegistration = () => {
    setShowLastTimeRegistration(!showLastTimeRegistration);
  };

  const handleDeleteEvent = () => {
    if (props.event.id)
      eventService.deleteEventById(props.event.id).then((res) => {
        props.onSave();
      });
  };

  const handleEditEvent = () => {
    if (props.event.id)
      eventService.updateEventById(props.event.id, eventInfo).then((res) => {
        ToastAndroid.show("Changes saved!", ToastAndroid.SHORT);
        props.onSave();
      });
  };

  const deleteGoing = () => {
    eventService
      .deleteGoingForEvent(props.event.id, userId)
      .then((response) => {
        props.onSave();
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
                disabled={!editable}
              />
              <TextInput
                style={styles.input}
                label="Description"
                value={eventInfo.description}
                onChangeText={(text: any) => handleChange(text, "description")}
                activeUnderlineColor={"#000000"}
                disabled={!editable}
              />
              <DateTimePickerModal
                date={new Date(eventInfo.startDate)}
                isVisible={showStartDate && editable}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "startDate");
                }}
                onCancel={() => {
                  setShowStartDate(false);
                }}
              />
              <TouchableOpacity
                disabled={!editable}
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowStartDate();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="Start date"
                  value={moment(eventInfo.startDate).format("YYYY-MM-DD HH:mm")}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                date={new Date(eventInfo.endDate)}
                isVisible={showEndDate && editable}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "endDate");
                }}
                onCancel={() => {
                  setShowEndDate(false);
                }}
              />
              <TouchableOpacity
                disabled={!editable}
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowEndDate();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="End date"
                  value={moment(eventInfo.endDate).format("YYYY-MM-DD HH:mm")}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                date={new Date(eventInfo.lastTimeRegistration)}
                isVisible={showLastTimeRegistration && editable}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "lastTimeRegistration");
                }}
                onCancel={() => {
                  setShowLastTimeRegistration(false);
                }}
              />
              <TouchableOpacity
                disabled={!editable}
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowLastTimeRegistration();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="Last Time Registration"
                  value={moment(eventInfo.lastTimeRegistration).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                label="Max attendants"
                value={eventInfo.maxAttendants.toString()}
                onChangeText={(text: any) =>
                  handleChange(text, "maxAttendants")
                }
                activeUnderlineColor={"#000000"}
                disabled={!editable}
              />
              <TextInput
                style={styles.input}
                label="Place"
                placeholder="Place"
                value={eventInfo.place}
                activeUnderlineColor={"#000000"}
                disabled={true}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              {(props.type === "startpage" ||
                props.type === "history" ||
                props.type === "profile") && (
                <TouchableOpacity onPress={() => props.onChange()}>
                  <IconButton iconName="check-circle" text="OK" />
                </TouchableOpacity>
              )}

              {props.type === "startpage" && (
                <Link
                  component={TouchableOpacity}
                  to={`/map/${props.event.id}/${props.event.latitude}/${props.event.longitude}`}
                >
                  <IconButton iconName="map" text="Go to Map" />
                </Link>
              )}

              {props.type === "participating" && (
                <TouchableOpacity onPress={() => deleteGoing()}>
                  <IconButton iconName="trash" text="Discard" />
                </TouchableOpacity>
              )}

              {props.type === "profile" && !editable && (
                <TouchableOpacity onPress={() => handleEditable()}>
                  <IconButton iconName="edit" text="Edit" />
                </TouchableOpacity>
              )}
              {props.type === "profile" && editable && (
                <TouchableOpacity
                  onPress={() => {
                    handleEditEvent();
                    props.onChange();
                  }}
                >
                  <IconButton iconName="save" text="Save" />
                </TouchableOpacity>
              )}
              {props.type === "profile" && (
                <TouchableOpacity onPress={() => handleDeleteEvent()}>
                  <IconButton iconName="trash" text="Delete" />
                </TouchableOpacity>
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
