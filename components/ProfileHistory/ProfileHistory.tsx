import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, ToastAndroid } from "react-native";
import { EventRespone } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import { store } from "../../store/store";
import EventCard from "../EventCard/EventCard";
import TopContainer from "../TopContainer/TopContainer";

const ProfileHistory = (props: { history: any }) => {
  const [yourEvents, setYourEvents] = useState<EventRespone[]>();

  const eventService = new EventService();

  useEffect(() => {
    let id = store.getState().loggedReducer.id || 0;
    let isSubscribed = true;
    eventService
      .getUserHistoryEvents(id)
      .then((response) => {
        if (isSubscribed) setYourEvents(response);
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
  }, []);

  return (
    <View style={styles.container}>
      <TopContainer
        name={"History"}
        link={"/profile"}
        icon={false}
        history={props.history}
      />
      {yourEvents && !yourEvents.length && (
        <View style={styles.eventHeadlineContainer}>
          <Text style={styles.eventHeadline}>
            You didn't participate in any event
          </Text>
        </View>
      )}
      {yourEvents && yourEvents.length !== 0 && (
        <View style={styles.eventListContainer}>
          <FlatList
            data={yourEvents}
            keyExtractor={(item) => item.eventDetails.id.toString()}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.eventListItemContainer}>
                  <EventCard event={item} modalType="history" />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventHeadlineContainer: {
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
  },
  eventListItemContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  eventListContainer: {
    height: "70%",
  },
  eventHeadline: {
    marginTop: 10,
    color: "#908989",
    fontSize: 20,
  },
});

export default ProfileHistory;
