import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { EventRespone } from "../../models/EventInterfaces";
import EventCard from "../EventCard/EventCard";
import TopContainer from "../TopContainer/TopContainer";
import { LinearGradient } from "expo-linear-gradient";

const SearchResults = (props: { history: any; location: any }) => {
  const [searchEvents, setSearchEvents] = useState<EventRespone[]>(
    props.location.state.events
  );
  const [edit, setEdit] = useState<boolean>(false);

  const handleAscending = () => {
    let newSearch = searchEvents.sort(function (a, b) {
      let val =
        new Date(...b.eventDetails.startDate) -
        new Date(...a.eventDetails.startDate);
      return val;
    });
    setSearchEvents(newSearch);
    setEdit(!edit);
  };

  const handleDescending = () => {
    let newSearch = searchEvents.sort((a, b) => {
      let val =
        new Date(...a.eventDetails.startDate) -
        new Date(...b.eventDetails.startDate);
      return val;
    });
    setSearchEvents(newSearch);
    setEdit(!edit);
  };

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Search"}
        link={"/search"}
        icon={false}
        history={props.history}
      />
      {searchEvents && !searchEvents.length && (
        <View style={styles.eventHeadlineContainer}>
          <Text style={styles.eventHeadline}>Couldn't find anything</Text>
        </View>
      )}
      {searchEvents && searchEvents.length !== 0 && (
        <View style={styles.mainContainer}>
          <Text style={styles.headline}>Sort by Start date</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleDescending();
              }}
            >
              <LinearGradient
                colors={["#FC8E67", "#FDCC4E"]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Descending</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAscending();
              }}
            >
              <LinearGradient
                colors={["#FC8E67", "#FDCC4E"]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ascending</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.eventListContainer}>
            <FlatList
              data={searchEvents}
              keyExtractor={(item) => item.eventDetails.id.toString()}
              style={{ flex: 1 }}
              extraData={edit}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.eventListItemContainer}>
                    <EventCard event={item} modalType="startpage" />
                  </View>
                );
              }}
            />
          </View>
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
  mainContainer: {
    height: "100%",
  },
  eventHeadline: {
    marginTop: 10,
    color: "#908989",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    width: 150,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
  },
  headline: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
  },
});

export default SearchResults;
