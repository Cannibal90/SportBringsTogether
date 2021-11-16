import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import TopContainer from "../TopContainer/TopContainer";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useParams } from "react-router";

const Map = () => {
  //dodac parametry lat i long do url dla MAP
  //usunac Activity Details i Zastapic to jako Map wysrodkowayant
  //po przyjeciu lat i long znalezc event i go wysrodkowac i pokazac modala
  Location.installWebGeolocationPolyfill();
  const params = useParams() as any;
  const [mapRef, setMapRef] = useState<any>();
  const [currentLatitude, setCurrentLatitude] = useState<number>(51.759445);
  const [currentLongitude, setCurrentLongitude] = useState<number>(19.457216);
  const [addEvent, setAddEvent] = useState<boolean>(false);

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const region = {
        latitude: params.lat ? params.lat : res.coords.latitude,
        longitude: params.lon ? params.lon : res.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      if (mapRef) mapRef.animateToRegion(region);

      setCurrentLatitude(res.coords.latitude);
      setCurrentLongitude(res.coords.longitude);
    });
  }, [mapRef]);

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
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => {
            handleAddMarker();
          }}
        >
          <Marker
            coordinate={{
              longitude: currentLongitude,
              latitude: currentLatitude,
            }}
            image={require("../../images/marker.png")}
          />
        </MapView>
        {/* <Link
          to={"/map/create"}
          component={TouchableOpacity}
          style={styles.floatButton}
        > */}
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
        {/* </Link> */}
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
