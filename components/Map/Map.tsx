import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import TopContainer from "../TopContainer/TopContainer";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { EventRespone, InAreaRequest } from "../../models/EventInterfaces";
import { EventService } from "../../services/EventService";
import MapEventLayer from "../MapEventLayer/MapEventLayer";
import MapCreateEvents from "../MapCreateEvent/MapCreateEvents";
import Geocoder from "react-native-geocoding";
import config from "../../config";

const Map = (props: { match: any; history: any }) => {
  Location.installWebGeolocationPolyfill();
  Geocoder.init(config.GOOGLE_API_KEY);
  const [mapRef, setMapRef] = useState<any>();
  const [defaultLocation, setDefaultLocation] = useState<any>({
    latitude: 51.759445,
    longitude: 19.457216,
  });
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [eventMarkers, setEventMarkers] = useState<EventRespone[]>();
  const [openLayer, setOpenLayer] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [createLayer, setCreateLayer] = useState<boolean>(false);
  const [place, setPlace] = useState<string>("");
  const [coordinate, setCoordinate] = useState<any>();
  const [createdEvent, setCreatedEvent] = useState<number>();

  const eventService = new EventService();

  const handleChangeAddEvent = () => {
    setAddEvent(!addEvent);
    ToastAndroid.show("Choose place to add marker!", ToastAndroid.SHORT);
  };

  const handleAddMarker = (a: any) => {
    if (addEvent) {
      setCoordinate(a);
      Geocoder.from(a.latitude, a.longitude)
        .then((response: any) => {
          setPlace(response.results[1].formatted_address);
          handleCreateEvent();
        })
        .catch((error) => {
          ToastAndroid.show(
            "Something goes wrong, try again handleAddMarker",
            ToastAndroid.SHORT
          );
        })
        .finally(() => {
          setAddEvent(!addEvent);
        });
    }
  };

  const handleShowLayer = () => {
    setOpenLayer(!openLayer);
    if (selectedEvent) {
      props.history.push("/map");
    }
  };

  const handleCreateEvent = () => {
    if (createLayer === true) {
      setCoordinate({});
      setPlace("");
    }
    setCreateLayer(!createLayer);
  };

  const handleShowEventDetails = (event: any) => {
    setSelectedEvent(event.id);
    setOpenLayer(true);
  };

  const handleSearchNearbyEvents = () => {
    if (mapRef) {
      const area = {
        latitude: mapRef.__lastRegion.latitude,
        latitudeDelta: mapRef.__lastRegion.latitudeDelta,
        longitude: mapRef.__lastRegion.longitude,
        longitudeDelta: mapRef.__lastRegion.longitudeDelta,
      } as InAreaRequest;
      eventService
        .getNearbyEvents(area)
        .then((response) => {
          setEventMarkers(response);
        })
        .catch(() => {
          ToastAndroid.show(
            "Something goes wrong, try again...handleSearchNearbyEvents",
            ToastAndroid.SHORT
          );
        });
    }
  };
  const handleCreateResponse = (response: number) => {
    handleCreateEvent();
    setCreatedEvent(response);
  };

  useEffect(() => {
    let isSubscribed = true;
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

      if (mapRef && isSubscribed) {
        mapRef.animateToRegion(region);
      }

      setDefaultLocation({
        latitude: lat,
        longitude: log,
      });
    });
    return () => {
      isSubscribed = false;
    };
  }, [mapRef]);

  useEffect(() => {
    let isSubscribed = true;
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

      if (mapRef && isSubscribed) {
        eventService
          .getNearbyEvents(region)
          .then((response) => {
            if (isSubscribed) {
              setEventMarkers(response);
            }
          })
          .catch((error) => {
            console.log(error);
            ToastAndroid.show(
              "Something goes wrong, try again...useEffect",
              ToastAndroid.SHORT
            );
          });
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [defaultLocation]);

  useEffect(() => {
    let isSubscribed = true;
    const lat = props.match.params.lat
      ? Number.parseFloat(props.match.params.lat)
      : defaultLocation.latitude;
    const log = props.match.params.lon
      ? Number.parseFloat(props.match.params.lon)
      : defaultLocation.longitude;

    const region = {
      latitude: lat ? lat : 51.759445,
      longitude: log ? log : 19.457216,
      latitudeDelta: 0.07530116785195418,
      longitudeDelta: 0.07530116785195418,
    };

    eventService
      .getNearbyEvents(region)
      .then((response) => {
        if (isSubscribed) {
          setEventMarkers(response);
          if (props.match.params.id && response) {
            const res = response.filter(
              (event) => event.id === Number.parseInt(props.match.params.id)
            )[0];
            if (res) {
              setSelectedEvent(res.id);
              setOpenLayer(true);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(
          "Something goes wrong, try again...useEffect",
          ToastAndroid.SHORT
        );
      });

    return () => {
      isSubscribed = false;
    };
  }, [props.match]);

  useEffect(() => {
    let isSubscribed = true;

    if (mapRef) {
      const area = {
        latitude: mapRef.__lastRegion.latitude,
        latitudeDelta: mapRef.__lastRegion.latitudeDelta,
        longitude: mapRef.__lastRegion.longitude,
        longitudeDelta: mapRef.__lastRegion.longitudeDelta,
      } as InAreaRequest;

      eventService
        .getNearbyEvents(area)
        .then((response) => {
          if (isSubscribed) {
            setEventMarkers(response);
            if (createdEvent && response) {
              const res = response.filter(
                (event) => event.id === createdEvent
              )[0];
              setSelectedEvent(res.id);
              setOpenLayer(true);
              setCreatedEvent(undefined);
            }
          }
        })
        .catch(() => {
          ToastAndroid.show(
            "Something goes wrong, try again...",
            ToastAndroid.SHORT
          );
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [createdEvent]);

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Map"}
        link={"/startpage"}
        icon={"search"}
        history={props.history}
      />
      <View style={styles.mapContainer}>
        <MapView
          ref={(map) => {
            setMapRef(map);
          }}
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            handleAddMarker(e.nativeEvent.coordinate);
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

        <TouchableOpacity
          style={styles.search}
          onPress={() => {
            handleSearchNearbyEvents();
          }}
        >
          {!createLayer && !addEvent && (
            <Text style={styles.searchButton}>
              Search events in this region
            </Text>
          )}
        </TouchableOpacity>

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
          eventId={selectedEvent}
        />
        <MapCreateEvents
          visible={createLayer}
          onChange={handleCreateEvent}
          coordinates={coordinate}
          place={place}
          handleCreateResponse={handleCreateResponse}
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
  search: {
    position: "absolute",
    top: 10,
  },
  searchButton: {
    fontSize: 20,
    fontWeight: "600",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    height: 40,
    width: "100%",
    paddingTop: 4,
    paddingHorizontal: 10,
  },
});

export default Map;
