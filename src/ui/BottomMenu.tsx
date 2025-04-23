import React from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";

export const BottomMenu = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.menuContainer}>
            {/* Переход на MainScreen */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "MainScreen" }],
                    })
                }
            >
                <Image
                    source={require("../assets/HomeIcon.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Переход на MonthScreen */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => alert('Вы были перекинуты на текущий месяц')}
            >
                <Image
                    source={require("../assets/CalendarIcon.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: "absolute",
        height: 60,
        bottom: 0.01,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10,
        backgroundColor: '#2DA1F4',
    },
    menuItem: {
        width: 40,
        height: 40,
    },
    icon: {
        width: 30,
        height: 30,
    },
});
