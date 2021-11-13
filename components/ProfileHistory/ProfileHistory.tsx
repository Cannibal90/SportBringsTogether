import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { EventRespone } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import EventCard from "../EventCard/EventCard";
import TopContainer from "../TopContainer/TopContainer";

const ProfileHistory = () => {
  const [yourEvents, setYourEvents] = useState<EventRespone[]>();

  const eventService = new EventService();

  const fetchYourEvents = () => {
    eventService.getUserHistoryEvents(1).then((response) => {
      setYourEvents(response);
    });
  };

  useEffect(() => {
    fetchYourEvents();
  }, []);

  return (
    <View style={styles.container}>
      <TopContainer name={"History"} link={"/profile"} icon={false} />
      {yourEvents && !yourEvents.length && (
        <View style={styles.eventCardsContainer}>
          <Text style={styles.eventHeadline}>
            You didn't participate in any event
          </Text>
        </View>
      )}
      <View style={styles.eventCardsContainer}>
        {yourEvents &&
          yourEvents.map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventCardsContainer: {
    height: "70%",
    flexDirection: "column",
    alignItems: "center",
  },
  eventHeadline: {
    marginTop: 10,
    color: "#908989",
    fontSize: 20,
  },
});

export default ProfileHistory;
