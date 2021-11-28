import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import TopContainer from "../TopContainer/TopContainer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UserService } from "../../services/UserService";
import { store } from "../../store/store";

const ProfileTrophies = (props: { history: any }) => {
  const [level, setLevel] = useState<string>("");

  const userService = new UserService();

  const checkBeginer = () => {
    if (level === "Beginner" || level === "Mid" || level === "Senior") {
      return true;
    }
    return false;
  };
  const checkMid = () => {
    if (level === "Mid" || level === "Senior") {
      return true;
    }
    return false;
  };
  const checkSenior = () => {
    if (level === "Senior") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    userService
      .getUserBadges(store.getState().loggedReducer.id)
      .then((response) => {
        if (response) {
          setLevel(response);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <TopContainer
        name={"Trophies"}
        link={"/profile"}
        icon={false}
        history={props.history}
      />
      <View style={styles.profileContainer}>
        <View style={styles.rectangle}>
          <View
            style={[
              styles.rectangle,
              !checkBeginer()
                ? { backgroundColor: "rgba(196,196,196,0.78)" }
                : {},
            ]}
          >
            {checkBeginer() ? (
              <Icon
                name="check-square"
                size={40}
                color="#00f320"
                style={styles.iconsLeft}
              />
            ) : (
              <Icon
                name="lock"
                size={40}
                color="rgba(196,196,196,1)"
                style={styles.iconsLeft}
              />
            )}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.rectangleText,
                  !checkBeginer() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Beginner
              </Text>
              <Text
                style={[
                  styles.description,
                  !checkBeginer() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Take part in 10 events
              </Text>
            </View>
            <Icon
              style={{ marginLeft: 70 }}
              name="glass-cheers"
              size={40}
              color={checkBeginer() ? "#00f320" : "rgba(196,196,196,1)"}
            />
          </View>
        </View>

        <View style={styles.rectangle}>
          <View
            style={[
              styles.rectangle,
              !checkMid() ? { backgroundColor: "rgba(196,196,196,0.78)" } : {},
            ]}
          >
            {checkMid() ? (
              <Icon
                name="check-square"
                size={40}
                color="#00f320"
                style={styles.iconsLeft}
              />
            ) : (
              <Icon
                name="lock"
                size={40}
                color="rgba(196,196,196,1)"
                style={styles.iconsLeft}
              />
            )}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.rectangleText,
                  !checkMid() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Mid
              </Text>
              <Text
                style={[
                  styles.description,
                  !checkMid() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Create 20 events
              </Text>
            </View>
            <Icon
              style={{ marginLeft: 110 }}
              name="trophy"
              size={40}
              color={checkMid() ? "#e2f104" : "rgba(196,196,196,1)"}
            />
          </View>
        </View>

        <View style={styles.rectangle}>
          <View
            style={[
              styles.rectangle,
              !checkSenior()
                ? { backgroundColor: "rgba(196,196,196,0.78)" }
                : {},
            ]}
          >
            {checkSenior() ? (
              <Icon
                name="check-square"
                size={40}
                color="#00f320"
                style={styles.iconsLeft}
              />
            ) : (
              <Icon
                name="lock"
                size={40}
                color="rgba(196,196,196,1)"
                style={styles.iconsLeft}
              />
            )}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.rectangleText,
                  !checkSenior() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Senior
              </Text>
              <Text
                style={[
                  styles.description,
                  !checkSenior() ? { color: "#3f3d3d5a" } : {},
                ]}
              >
                Take part in and create 100 events
              </Text>
            </View>
            <Icon
              name="user-graduate"
              size={40}
              color={checkSenior() ? "#000000" : "rgba(196,196,196,1)"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(196,196,196,0.28)",
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 350,
    height: 100,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rectangleText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 30,
  },
  description: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -20,
    marginTop: 15,
  },
  iconsLeft: {
    marginLeft: 10,
    marginRight: 40,
  },
});

export default ProfileTrophies;
