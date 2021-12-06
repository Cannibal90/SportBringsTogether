import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Link } from "react-router-native";
import TopContainer from "../TopContainer/TopContainer";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { EventService } from "../../services/EventService";
import { EventRespone } from "../../models/EventInterfaces";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const Search = (props: { history: any }) => {
  const [params, setParams] = useState<any>({
    city: "",
    tags: "",
    sharedID: "",
    startDate: new Date(),
    changedStart: false,
    endDate: new Date(),
    changedEnd: false,
  });
  const [nearbyEvents, setNearbyEvents] = useState<EventRespone[]>();
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);

  const eventService = new EventService();

  const fetchNearbyEvents = () => {
    let timeReq = {
      start: null,
      end: null,
    };

    if (params.changedStart) {
      timeReq.start = params.startDate;
    }
    if (params.changedEnd) {
      timeReq.end = params.endDate;
    }
    eventService
      .searchEvents(params.sharedID, params.tags, params.city, timeReq)
      .then((response) => {
        setNearbyEvents(response);
        ToastAndroid.show("You can see results!", ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show(
          "Something goes wrong, try again...",
          ToastAndroid.SHORT
        );
      });
  };

  const handleChange = (item: any, name: any) => {
    if (name === "startDate") {
      handleShowStartDate();
      setParams({
        ...params,
        startDate: item,
        changedStart: true,
      });
    } else if (name === "endDate") {
      handleShowEndDate();
      setParams({
        ...params,
        endDate: item,
        changedEnd: true,
      });
    } else {
      setParams({
        ...params,
        [name]: item,
      });
    }
  };

  const handleShowStartDate = () => {
    setShowStartDate(!showStartDate);
  };

  const handleShowEndDate = () => {
    setShowEndDate(!showEndDate);
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
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                label="Tags"
                value={params.tags}
                onChangeText={(text: any) => handleChange(text, "tags")}
                activeUnderlineColor={"#000000"}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                label="Shared ID"
                value={params.sharedID}
                onChangeText={(text: any) => handleChange(text, "sharedID")}
                activeUnderlineColor={"#000000"}
                autoCapitalize="none"
              />

              {showStartDate && (
                <DateTimePicker
                  value={params.startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event: any, selectedDate: any) => {
                    handleChange(selectedDate, "startDate");
                  }}
                />
              )}
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  handleShowStartDate();
                }}
              >
                <TextInput
                  style={{ fontWeight: "700" }}
                  label="Start date"
                  value={
                    moment(params.startDate).format("YYYY-MM-DD") ===
                    moment(new Date()).format("YYYY-MM-DD")
                      ? ""
                      : moment(params.startDate)
                          .subtract(1, "months")
                          .format("YYYY-MM-DD")
                  }
                  disabled={true}
                  activeUnderlineColor={"#000000"}
                />
              </TouchableOpacity>

              {showEndDate && (
                <DateTimePicker
                  value={params.startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event: any, selectedDate: any) => {
                    handleChange(selectedDate, "endDate");
                  }}
                />
              )}
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  handleShowEndDate();
                }}
              >
                <TextInput
                  style={{ fontWeight: "700" }}
                  label="End date"
                  value={
                    moment(params.endDate).format("YYYY-MM-DD") ===
                    moment(new Date()).format("YYYY-MM-DD")
                      ? ""
                      : moment(params.endDate).format("YYYY-MM-DD")
                  }
                  disabled={true}
                  activeUnderlineColor={"#000000"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              fetchNearbyEvents();
            }}
            style={{ alignItems: "center" }}
          >
            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>
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
              <Text style={styles.buttonText}>See results</Text>
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
    height: 420,
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
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default Search;
