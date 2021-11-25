import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { EventRespone, InAreaRequest } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import EventCard from "../EventCard/EventCard";
import Logo from "../Logo/Logo";
import * as Location from "expo-location";

const Startpage = () => {
  Location.installWebGeolocationPolyfill();
  const [nearbyEvents, setNearbyEvents] = useState<EventRespone[]>();

  const eventService = new EventService();

  const fetchNearbyEvents = (area: any) => {
    eventService.getNearbyEvents(area).then((response) => {
      setNearbyEvents(response);
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const area = {
        latitude: res.coords.latitude,
        latitudeDelta: 0.07530116785195418,
        longitude: res.coords.longitude,
        longitudeDelta: 0.07530116785195418,
      } as InAreaRequest;
      fetchNearbyEvents(area);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.eventHeadlineContainer}>
        <Text style={styles.eventHeadline}>Events in nearbly area</Text>
      </View>
      {nearbyEvents && nearbyEvents.length !== 0 ? (
        <View style={styles.eventListContainer}>
          <FlatList
            data={nearbyEvents}
            keyExtractor={(item) => item.eventDetails.id.toString()}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.eventListItemContainer}>
                  <EventCard event={item} modalType="startpage" />
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={[styles.eventListContainer, { alignItems: "center" }]}>
          <Text style={styles.eventHeadlineAny}>
            Can't find any events in nearby area!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventHeadlineContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  eventListItemContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  eventListContainer: {
    height: "55%",
  },
  eventHeadline: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "700",
  },
  eventHeadlineAny: {
    marginTop: 10,
    color: "#908989",
    fontSize: 20,
  },
});

export default Startpage;
