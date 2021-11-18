import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { EventRespone } from "../../models/EventInterfaces";
import EventCard from "../EventCard/EventCard";
import TopContainer from "../TopContainer/TopContainer";

const SearchResults = (props: { history: any; location: any }) => {
  const [searchEvents, setSearchEvents] = useState<EventRespone[]>(
    props.location.state.events
  );

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
        <View style={styles.eventListContainer}>
          <FlatList
            data={searchEvents}
            keyExtractor={(item) => item.eventDetails.id.toString()}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.eventListItemContainer}>
                  <EventCard
                    event={item}
                    modalType="startpage"
                    editable={true}
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

export default SearchResults;
