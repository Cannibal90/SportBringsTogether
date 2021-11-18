import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";
import { HelperText, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { EventService } from "../../services/EventService";
import { EventRespone } from "../../models/EventInterfaces";

const Search = (props: { history: any }) => {
  const [params, setParams] = useState<any>({
    city: "",
    tags: "",
    sharedID: "",
  });
  const [nearbyEvents, setNearbyEvents] = useState<EventRespone[]>();

  const eventService = new EventService();

  const fetchNearbyEvents = () => {
    eventService.getNearbyEvents().then((response) => {
      setNearbyEvents(response);
    });
  };

  useEffect(() => {
    fetchNearbyEvents();
  }, []);

  const handleChange = (item: any, name: any) => {
    setParams({
      ...params,
      [name]: item,
    });
  };

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Search"}
        link={"/map"}
        icon={false}
        history={props.history}
      />
      <View style={styles.searchContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                label="City"
                value={params.city}
                onChangeText={(text: any) => handleChange(text, "city")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Tags"
                value={params.tags}
                onChangeText={(text: any) => handleChange(text, "tags")}
                activeUnderlineColor={"#000000"}
              />
              <TextInput
                style={styles.input}
                label="Shared ID"
                value={params.sharedID}
                onChangeText={(text: any) => handleChange(text, "sharedID")}
                activeUnderlineColor={"#000000"}
              />
            </View>
          </View>
          <Link
            to={{
              pathname: "/search/results",
              state: { events: nearbyEvents },
            }}
            style={{ alignItems: "center" }}
            component={TouchableOpacity}
          >
            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Search</Text>
            </LinearGradient>
          </Link>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    width: 320,
    height: 300,
    borderRadius: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  input: {
    marginVertical: 10,
    fontWeight: "700",
    backgroundColor: "rgba(196, 196, 196, 0.28)",
    borderRadius: 10,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    width: 250,
    height: 70,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default Search;
