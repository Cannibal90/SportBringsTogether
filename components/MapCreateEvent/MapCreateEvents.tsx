import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { EventRequest } from "../../models/EventInterfaces";
import { TextInput } from "react-native-paper";
import moment from "moment";
import IconButton from "../IconButton/IconButton";
import { EventService } from "../../services/EventService";
import { store } from "../../store/store";

const MapCreateEvents = (props: {
  visible: any;
  onChange: any;
  coordinates: any;
  place: any;
  handleCreateResponse: any;
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
    tags: "",
    creatorId: store.getState().loggedReducer.id || 0,
  });
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showLastTimeRegistration, setShowLastTimeRegistration] =
    useState<boolean>(false);

  const eventService = new EventService();

  useEffect(() => {
    if (props.coordinates && props.place) {
      setEvent({
        ...event,
        longitude: props.coordinates.longitude,
        latitude: props.coordinates.latitude,
        place: props.place,
      });
    }
  }, [props.coordinates, props.place]);

  const handleChange = (item: any, name: any) => {
    if (name === "startDate") {
      handleShowStartDate();
    } else if (name === "endDate") {
      handleShowEndDate();
    } else if (name === "lastTimeRegistration") {
      handleShowLastTimeRegistration();
    }

    setEvent({
      ...event,
      [name]: item,
    });
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

  const handleCreateEvent = () => {
    eventService
      .createEvent(event)
      .then((response) => {
        if (response) props.handleCreateResponse(response.id);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
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
                label="Description"
                value={event.description}
                onChangeText={(text: any) => handleChange(text, "description")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Tags(split using coma)"
                value={event.tags}
                onChangeText={(text: any) => handleChange(text, "tags")}
                activeUnderlineColor={"#000000"}
              />
              <DateTimePickerModal
                date={new Date(event.startDate)}
                isVisible={showStartDate}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "startDate");
                }}
                onCancel={() => {
                  setShowStartDate(false);
                }}
              />
              <TouchableOpacity
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowStartDate();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="Start date"
                  value={moment(event.startDate).format("YYYY-MM-DD HH:mm")}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                date={new Date(event.endDate)}
                isVisible={showEndDate}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "endDate");
                }}
                onCancel={() => {
                  setShowEndDate(false);
                }}
              />
              <TouchableOpacity
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowEndDate();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="End date"
                  value={moment(event.endDate).format("YYYY-MM-DD HH:mm")}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                label="Max attendants"
                value={event.maxAttendants.toString()}
                onChangeText={(text: any) =>
                  handleChange(text, "maxAttendants")
                }
                activeUnderlineColor={"#000000"}
              />

              <DateTimePickerModal
                date={new Date(event.lastTimeRegistration)}
                isVisible={showLastTimeRegistration}
                mode="datetime"
                onConfirm={(event) => {
                  handleChange(event, "lastTimeRegistration");
                }}
                onCancel={() => {
                  setShowLastTimeRegistration(false);
                }}
              />
              <TouchableOpacity
                style={{ borderRadius: 10, width: "100%" }}
                onPress={() => {
                  handleShowLastTimeRegistration();
                }}
              >
                <TextInput
                  style={styles.input}
                  label="Last Time Registration"
                  value={moment(event.lastTimeRegistration).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                  activeUnderlineColor={"#000000"}
                  disabled={true}
                />
              </TouchableOpacity>
              <View style={styles.lastButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleCreateEvent();
                  }}
                >
                  <IconButton iconName="save" text="Create" />
                </TouchableOpacity>
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
