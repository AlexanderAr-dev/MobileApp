import {Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CheckBoxWithText} from "../ui/CheckBoxWithText";
import {useState} from "react";
import {useCreateExpense} from "../hooks/useExpenses";

export default function  QuickCreate() {
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const createExpense = useCreateExpense()
    return (
        <View style={styles.container}>
            <View  style={styles.currentDay}>
                <Text style={styles.currentDayText}>
                    11/02
                </Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Название"
                />
                <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Сумма"
                />
            </View>
            <View style={styles.check}>
                <CheckBoxWithText
                    label="Не влиять на бюджет?"
                    checked={isAgreed}
                    onChange={setIsAgreed}
                />
            </View>
            <View style={styles.btnAgree}>
                <TouchableOpacity style={styles.button} onPress={() => createExpense.mutate()}>
                    <Text style={styles.buttonText} >+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: 312,
        height: 310,
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
    },
    currentDayText: {
        color: "#FFF",
        fontSize: 18,
    },
    inputs: {
        alignItems: "center",
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
    check: {
        justifyContent: "center",
        alignItems: "center",
    },
    btnAgree: {
        flex: 1,
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
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
});
