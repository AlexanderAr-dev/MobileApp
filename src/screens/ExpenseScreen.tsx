import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CheckBoxWithText } from "../ui/CheckBoxWithText";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, {MapPressEvent, Marker} from "react-native-maps";

import {IExpense} from "../types/IExpense";
import {deleteExpense} from "../utils/database";
import {useContext} from "react";


export function ExpenseScreen() {
    const route = useRoute();
    const { expense } = route.params as { expense: IExpense };
    const navigation = useNavigation<StackNavigationProp<any>>(); // Замените на ваш тип RootStackParamList
//     const parseLocation = (locationString: string) => {
//         const [lat, lng] = locationString.split(',').map(Number);
//         return {
//             latitude: lat,
//             longitude: lng,
//         };
//     };
//
// // Предположим, это строка из базы
//     const location = parseLocation(expense.location); // например, "55.75,37.61"

    const handleDelete = async () => {
        Alert.alert("Удаление", "Вы уверены, что хотите удалить расход?", [
            { text: "Отмена", style: "cancel" },
            {
                text: "Удалить",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteExpense(expense.id);
                        navigation.navigate("MainScreen"); // ✅ возвращаемся к дню
                    } catch (e) {
                        Alert.alert("Ошибка при удалении", String(e));
                    }
                },
            },
        ]);
    };


    if (!expense) {
        return <Text>Данные расхода не найдены</Text>;
    }


    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <Text style={styles.inputsText}>Название расхода</Text>
                    <Text
                        style={styles.input}
                    >
                        {expense.description}
                    </Text>
                    <Text style={styles.inputsText}>Сумма</Text>
                    <Text
                        style={styles.input}
                    >
                        {expense.cost}
                    </Text>/
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.inputsText}>Категория</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        <Text>
                            {expense.category}
                        </Text>
                    </View>
                </View>

                {/*<View style={styles.mapContainer}>*/}
                {/*    <Text style={styles.inputsText}>Местоположение</Text>*/}
                {/*    <MapView*/}
                {/*        style={{ width: '100%', height: 200 }}*/}
                {/*        region={{*/}
                {/*            ...location,*/}
                {/*            latitudeDelta: 0.01,*/}
                {/*            longitudeDelta: 0.01,*/}
                {/*        }}*/}
                {/*        scrollEnabled={false}*/}
                {/*        zoomEnabled={false}*/}
                {/*    >*/}
                {/*        <Marker coordinate={location} />*/}
                {/*    </MapView>*/}
                {/*</View>*/}

                <View style={styles.check}>
                    <CheckBoxWithText
                        label="Влияет на бюджет?"
                        checked={expense.affect}
                    />
                </View>

                <View style={styles.btnAgree}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditExpenseScreen", { expense })}>
                        <Text style={styles.buttonText}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnAgree}>
                    <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Удалить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styless = StyleSheet.create({
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
        width: "auto",
        height: 38,
        backgroundColor: "#2DA1F4",
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 5,
    },
    buttonRed: {
        backgroundColor: "#f42d3e",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
});
