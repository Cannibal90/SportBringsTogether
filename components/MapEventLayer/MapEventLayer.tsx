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
import IconButton from "../IconButton/IconButton";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Clipboard from "expo-clipboard";
import moment from "moment";
import { store } from "../../store/store";
import { EventService } from "../../services/EventService";

const MapEventLayer = (props: {
  visible: any;
  onChange: any;
  eventId: any;
}) => {
  const userId = store.getState().loggedReducer.id;
  const [event, setEvent] = useState<any>();

  const eventService = new EventService();

  useEffect(() => {
    let isSubscribed = true;
    if (props.eventId)
      eventService
        .getEventById(Number.parseInt(props.eventId))
        .then((response) => {
          if (isSubscribed) setEvent(response);
        })
        .catch(() => {
          ToastAndroid.show(
            "Something goes wrong, try again...",
            ToastAndroid.SHORT
          );
        });
    return () => {
      isSubscribed = false;
    };
  }, [props.eventId]);

  const getGoing = () => {
    eventService
      .getGoingForEvent(event.id, userId)
      .then((response) => {
        setEvent(response);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
  };

  const deleteGoing = () => {
    eventService
      .deleteGoingForEvent(event.id, userId)
      .then((response) => {
        setEvent(response);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
  };

  const getInterested = () => {
    eventService
      .getInterestedForEvent(event.id, userId)
      .then((response) => {
        setEvent(response);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
  };

  const deleteInterested = () => {
    eventService
      .deleteInterestedForEvent(event.id, userId)
      .then((response) => {
        setEvent(response);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
  };

  const copyIdToClipboard = () => {
    Clipboard.setString(props.eventId.toString());
    ToastAndroid.show("Event ID copied to clipboard!", ToastAndroid.SHORT);
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
        {event && (
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={props.onChange}>
              <View style={styles.closeContainer}></View>
            </TouchableWithoutFeedback>
            <View style={styles.eventHeadlineContainer}>
              <Text style={styles.eventHeadlineTitleText}>
                {event.eventDetails.title}
              </Text>
              <Text style={styles.eventHeadlineTitleText}>
                {event.eventDetails.place}
              </Text>
              <Text style={styles.eventHeadlineTitleText}>
                Last time to register:{" "}
                {moment(
                  new Date(...event.eventDetails.lastTimeRegistration)
                ).format("YYYY-MM-DD HH:mm")}
              </Text>

              <View style={styles.eventHeadlineLatLogContainer}>
                <Text style={styles.eventHeadlineLatLog}>{event.latitude}</Text>
                <Text style={styles.eventHeadlineLatLog}>
                  {event.longitude}
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.modalView}
            >
              <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.buttonContainer}>
                  {event.eventInterestedUsers.includes(userId) ? (
                    <TouchableOpacity
                      onPress={() => {
                        deleteInterested();
                      }}
                      disabled={event.creatorId === userId}
                    >
                      <IconButton
                        iconName="star"
                        text="Interested"
                        color="#ddeb1c"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        getInterested();
                      }}
                      disabled={event.creatorId === userId}
                    >
                      <IconButton iconName="star" text="Interested" />
                    </TouchableOpacity>
                  )}

                  {event.goingEvents.includes(userId) ? (
                    <TouchableOpacity
                      onPress={() => {
                        deleteGoing();
                      }}
                      disabled={event.creatorId === userId}
                    >
                      <IconButton
                        iconName="check-square"
                        text="Going"
                        color="#00ff15"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        getGoing();
                      }}
                      disabled={event.creatorId === userId}
                    >
                      <IconButton iconName="check-square" text="Going" />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.descriptionText}>
                  {event.eventDetails.description}
                </Text>

                <View style={styles.rectangleContainer}>
                  <View
                    style={[styles.rectangle, { backgroundColor: "#FCEC91" }]}
                  >
                    <Text style={styles.rectangleText}>Durration time</Text>
                    <Icon name="clock-o" size={30} color="#000000" />
                    <Text style={styles.rectangleText}>
                      {moment(new Date(...event.eventDetails.startDate)).format(
                        "HH:mm"
                      )}{" "}
                      -{" "}
                      {moment(new Date(...event.eventDetails.endDate)).format(
                        "HH:mm"
                      )}
                    </Text>
                  </View>
                  <View
                    style={[styles.rectangle, { backgroundColor: "#99DCFB" }]}
                  >
                    <Text style={styles.rectangleText}>Max attendants</Text>
                    <Icon name="users" size={30} color="#000000" />
                    <Text style={styles.rectangleText}>
                      {event.eventDetails.maxAttendants}
                    </Text>
                  </View>
                </View>

                <View style={styles.rectangleContainer}>
                  <View
                    style={[styles.rectangle, { backgroundColor: "#FE778F" }]}
                  >
                    <Text style={styles.rectangleText}>Interested</Text>
                    <Icon name="street-view" size={30} color="#000000" />
                    <Text style={styles.rectangleText}>
                      {event.eventInterestedUsers.length}
                    </Text>
                  </View>
                  <View
                    style={[styles.rectangle, { backgroundColor: "#F2F2F2" }]}
                  >
                    <Text style={styles.rectangleText}>Going</Text>
                    <Icon name="check-circle-o" size={30} color="#000000" />
                    <Text style={styles.rectangleText}>
                      {event.goingEvents.length}
                    </Text>
                  </View>
                </View>
                <View style={styles.lastButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      copyIdToClipboard();
                    }}
                  >
                    <IconButton iconName="share-alt" text="Share" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        )}
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
    height: 100,
    borderRadius: 20,
    paddingTop: 5,
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
    height: 200,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionText: {
    paddingTop: 10,
    color: "#ffffff",
    fontSize: 15,
  },
  rectangleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rectangle: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    width: 150,
    height: 75,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  rectangleText: {
    fontSize: 14,
    fontWeight: "700",
  },
  lastButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default MapEventLayer;
