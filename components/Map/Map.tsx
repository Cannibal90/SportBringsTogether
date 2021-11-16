import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import TopContainer from "../TopContainer/TopContainer";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { EventRespone } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import MapEventLayer from "../MapEventLayer/MapEventLayer";

const Map = (props: { match: any }) => {
  Location.installWebGeolocationPolyfill();
  const [mapRef, setMapRef] = useState<any>();
  const [defaultLocation, setDefaultLocation] = useState<any>({
    latitude: 51.759445,
    longitude: 19.457216,
  });
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [eventMarkers, setEventMarkers] = useState<EventRespone[]>();
  const [openLayer, setOpenLayer] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();

  const eventService = new EventService();

  const handleChangeAddEvent = () => {
    setAddEvent(!addEvent);
    ToastAndroid.show("Choose place to add marker!", ToastAndroid.SHORT);
  };

  const handleAddMarker = () => {
    if (addEvent) {
      console.log("TAP");
      setAddEvent(!addEvent);
    }
  };

  const handleShowLayer = () => {
    setOpenLayer(!openLayer);
  };

  const handleShowEventDetails = (event: any) => {
    setSelectedEvent(event);
    setOpenLayer(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const lat = props.match.params.lat
        ? Number.parseFloat(props.match.params.lat)
        : res.coords.latitude;
      const log = props.match.params.lon
        ? Number.parseFloat(props.match.params.lon)
        : res.coords.longitude;

      const region = {
        latitude: lat,
        longitude: log,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      if (mapRef) mapRef.animateToRegion(region);

      setDefaultLocation({
        latitude: lat,
        longitude: log,
      });
    });
  }, [mapRef]);

  useEffect(() => {
    //pobieranie wszystkich w okolicy dla currentLocation
    eventService.getNearbyEvents().then((response) => {
      setEventMarkers(response);
      if (props.match.params.id && response) {
        setSelectedEvent(
          response.filter((event) => event.id === props.match.params.id)
        );
        setOpenLayer(true);
      }
    });
  }, [props.match]);

  return (
    <View style={styles.container}>
      <TopContainer name={"Map"} link={"/startpage"} icon={true} />
      <View style={styles.mapContainer}>
        <MapView
          ref={(map) => {
            setMapRef(map);
          }}
          style={styles.map}
          initialRegion={{
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => {
            handleAddMarker();
          }}
        >
          {eventMarkers &&
            eventMarkers.map((event) => {
              return (
                <Marker
                  key={event.id}
                  coordinate={{
                    longitude: event.longitude,
                    latitude: event.latitude,
                  }}
                  image={require("../../images/marker.png")}
                  onPress={() => {
                    handleShowEventDetails(event);
                  }}
                />
              );
            })}
        </MapView>

        {!addEvent && (
          <TouchableOpacity
            style={styles.floatButton}
            onPress={() => {
              handleChangeAddEvent();
            }}
          >
            <LinearGradient
              colors={["#FC8E67", "#FDCC4E"]}
              style={styles.addIcon}
            >
              <Icon name="plus" size={60} color={"#ffffff"} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        <MapEventLayer
          visible={openLayer}
          onChange={handleShowLayer}
          event={selectedEvent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addIcon: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default Map;
