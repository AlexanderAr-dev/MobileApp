import {Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CheckBoxWithText} from "../ui/CheckBoxWithText";
import {useState} from "react";

export function  CreateExpenseScreen() {
    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.container}>
                <View  style={styles.currentDay}>
                    <Text style={styles.currentDayText}>
                        11/02
                    </Text>
                </View>
                <View style={styles.inputs}>
                    <Text style={styles.inputsText}>Название расхода</Text>
                    <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                    />
                    <Text style={styles.inputsText}>Сумма</Text>
                    <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                    />
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.inputsText}>Категория</Text>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                            <View style={styles.categoryItem}>
                                <Text>Транспорт</Text>
                            </View>
                            <View style={styles.categoryItem}>
                                <Text>Прордукты</Text>
                            </View>
                            <View style={styles.categoryItem}>
                                <Text>Развлечения</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={styles.categoryItem}>
                                <Text>Остальное</Text>
                            </View>
                            <View style={styles.categoryItem}>
                                <Text>Переводы</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <Text style={[styles.inputsText, {marginTop: 15}]}>Показать на карте</Text>
                    <Image style={styles.logo} source={require("../assets/yandexpng.jpg")}/>
                </View>
                <View style={styles.check}>
                    <CheckBoxWithText
                        label="Не влиять на бюджет?"
                        checked={isAgreed}
                        onChange={setIsAgreed}
                    />
                </View>
                <View style={styles.btnAgree}>
                    <TouchableOpacity style={styles.button} onPress={() => alert("Кнопка нажата!")}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
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
        alignItems: "center",
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
