import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { EventRespone } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import EventCard from "../EventCard/EventCard";
import TopContainer from "../TopContainer/TopContainer";

const ProfileEvents = (props: { history: any }) => {
  const [yourEvents, setYourEvents] = useState<EventRespone[]>();

  const eventService = new EventService();

  const fetchYourEvents = () => {
    eventService.getUserCreatedEvents(1).then((response) => {
      setYourEvents(response);
    });
  };

  useEffect(() => {
    fetchYourEvents();
  }, []);

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Your events"}
        link={"/profile"}
        icon={false}
        history={props.history}
      />
      {yourEvents && !yourEvents.length && (
        <View style={styles.eventHeadlineContainer}>
          <Text style={styles.eventHeadline}>
            You haven't created any event
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
                  <EventCard
                    event={item}
                    modalType="profile"
                    editable={false}
                  />
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

export default ProfileEvents;
