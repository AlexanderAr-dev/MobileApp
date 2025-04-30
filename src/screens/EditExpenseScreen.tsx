import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { CheckBoxWithText } from "../ui/CheckBoxWithText";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { updateExpense } from "../utils/database";
import MapView, { Marker } from "react-native-maps";

type NavigationProp = StackNavigationProp<RootStackParamList, "EditExpenseScreen">;
type Route = RouteProp<RootStackParamList, "EditExpenseScreen">;

export function EditExpenseScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<Route>();
    const { expense } = route.params;

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Остальное");
    const [isAffecting, setIsAffecting] = useState(true);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        if (expense) {
            setTitle(expense.description);
            setAmount(String(expense.cost));
            setCategory(expense.category || "Остальное");
            setIsAffecting(expense.affect);
            if (expense.location && expense.location !== "не указано") {
                const [lat, lng] = expense.location.split(",").map(Number);
                setLocation({ latitude: lat, longitude: lng });
            }
        }
    }, [expense]);

    const handleUpdate = async () => {
        const cost = parseFloat(amount);
        if (!title || isNaN(cost)) {
            Alert.alert("Ошибка", "Заполните название и сумму.");
            return;
        }

        const updated = {
            time: new Date().toTimeString().slice(0, 5),
            category,
            description: title,
            cost,
            location: location
                ? `${location.latitude},${location.longitude}`
                : "не указано",
            affect: isAffecting,
        };

        try {
            await updateExpense(expense.id, updated);
            navigation.navigate("ExpenseScreen", { expense: expense });
        } catch (e) {
            Alert.alert("Ошибка при обновлении", String(e));
        }
    };



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

                <View style={styles.categoryContainer}>
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
                </View>

                <View style={styles.mapContainer}>
                    <Text style={[styles.inputsText, { marginTop: 15 }]}>Место</Text>
                    {location && (
                        <MapView
                            style={{ width: "100%", height: 200 }}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker coordinate={location} />
                        </MapView>
                    )}
                </View>

                <View style={styles.check}>
                    <CheckBoxWithText
                        label="Влияет на бюджет?"
                        checked={isAffecting}
                        onChange={setIsAffecting}
                    />
                </View>

                <View style={styles.btnAgree}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
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
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
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
