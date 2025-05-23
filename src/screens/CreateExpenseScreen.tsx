import React, { useState, useEffect } from "react";
import {
    Alert,
    Modal,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {addExpense} from "../utils/database";
import {CheckBoxWithText} from "../ui/CheckBoxWithText";
import { StyleSheet } from "react-native";


export function CreateExpenseScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<any>();
    const { dayId } = route.params ?? {};

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Не указано");
    const [isAffecting, setIsAffecting] = useState(true);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Разрешение отклонено");
                return;
            }
            const pos = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            };
            setLocation(coords);
        })();
    }, []);

    const handleSubmit = async () => {
        const cost = parseFloat(amount);
        if (!title || isNaN(cost)) {
            Alert.alert("Ошибка", "Заполните название и сумму.");
            return;
        }

        const now = new Date();
        const time = now.toTimeString().slice(0, 5);

        try {
            await addExpense(
                {
                    time,
                    category,
                    description: title,
                    cost,
                    location: location
                        ? `${location.latitude},${location.longitude}`
                        : "не указано",
                    affect: isAffecting,
                },
                dayId
            );
            navigation.goBack();
        } catch (e) {
            Alert.alert("Ошибка при добавлении", String(e));
        }
    };

    const leafletHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Map</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([${location?.latitude ?? 55.751244}, ${location?.longitude ?? 37.618423}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([${location?.latitude ?? 55.751244}, ${location?.longitude ?? 37.618423}], {draggable: true}).addTo(map);

        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          window.ReactNativeWebView.postMessage(JSON.stringify(e.latlng));
        });

        marker.on('dragend', function(e) {
          const coords = marker.getLatLng();
          window.ReactNativeWebView.postMessage(JSON.stringify(coords));
        });
      </script>
    </body>
    </html>
  `;

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <Text style={styles.inputsText}>Название расхода</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.inputsText}>Сумма</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.inputsText}>Категория</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {["Транспорт", "Продукты", "Развлечения", "Остальное", "Переводы"].map((cat) => (
                        <TouchableOpacity key={cat} onPress={() => setCategory(cat)}>
                            <View style={[
                                styles.categoryItem,
                                category === cat && { backgroundColor: "#ccc" },
                            ]}>
                                <Text>{cat}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.inputsText}>Местоположение</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ backgroundColor: "#eee", padding: 12, marginVertical: 10, borderRadius: 10 }}
                >
                    <Text>{location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : "Выбрать на карте"}</Text>
                </TouchableOpacity>

                <CheckBoxWithText
                    label="Влияет на бюджет?"
                    checked={isAffecting}
                    onChange={setIsAffecting}
                />

                <View style={styles.btnAgree}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* 📍 МОДАЛЬНОЕ ОКНО С КАРТОЙ */}
                <Modal visible={modalVisible} animationType="slide">
                    <SafeAreaView style={{ flex: 1 }}>
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: leafletHtml }}
                            javaScriptEnabled
                            onMessage={(event) => {
                                const coords = JSON.parse(event.nativeEvent.data);
                                setLocation({ latitude: coords.lat, longitude: coords.lng });
                                setModalVisible(false);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ padding: 16, backgroundColor: "#f00" }}
                        >
                            <Text style={{ color: "white", textAlign: "center" }}>Закрыть</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginTop: 10,
        width: 312,
        height: 'auto',
        backgroundColor: "#e1e1e1",
        borderRadius: 15,
        marginBottom: 20,
    },
    currentDay: {
        width: 102,
        height: 47,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    currentDayText: {
        color: "#FFF",
        fontSize: 18,
    },
    inputs: {
        alignItems: "center",
    },
    inputsText: {
       fontSize: 18,
    },
    input: {
        width: 258,
        height: 58,
        margin: 12,
        borderWidth: 0.5,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#f3efef",
    },
    categoryContainer: {
        alignItems: "center",
    },
    categoryItem: {
        width: 'auto',
        height: 40,
        borderRadius: 15,
        backgroundColor: "#C4C4C4",
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
    mapContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
    },

    map: {
        width: "100%",
        height: "100%",
    },
    logo: {
        width: 240,
        height: 145,
        margin: 10,
    },
    check: {
        justifyContent: "center",
        alignItems: "center",
    },
    btnAgree: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 70,
        height: 38,
        backgroundColor: "#2DA1F4",
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 5,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
});
