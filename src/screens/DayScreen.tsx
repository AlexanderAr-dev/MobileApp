import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { IDay } from "../types/IDay";
import { ListOfExpense } from "../elements/ListOfExpense";
import { StackNavigationProp } from "@react-navigation/stack";

export function DayScreen() {
    const route = useRoute();
    const { day } = route.params as { day: IDay };
    const navigation = useNavigation<StackNavigationProp<any>>(); // Замените на ваш тип RootStackParamList

    if (!day) {
        return <Text>Данные дня не найдены</Text>;
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.nameDay}>
                    <Text style={styles.nameDayText}>{day.date}</Text>
                </View>

                <View style={styles.perDay}>
                    <Text style={styles.perDayText}>Расходы за день</Text>
                </View>
                <View style={[styles.sumContainer, { backgroundColor: "rgba(218,58,58,0.78)" }]}>
                    <Text style={styles.sumText}>
                        {day.expenseSum ? day.expenseSum.toFixed(2) : '0.00'}
                    </Text>
                </View>

                <View style={styles.perDay}>
                    <Text style={styles.perDayText}>Доходы за день</Text>
                </View>
            </View>

            <View style={styles.btnAgree}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateExpenseScreen', {dayId: day.id})}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Список расходов */}
            <ListOfExpense currentDay={day.id} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginTop: 10,
        width: 312,
        height: "auto",
        backgroundColor: "#e1e1e1",
        borderRadius: 15,
        marginBottom: 15,
    },
    nameDay: {
        width: 117,
        height: 44,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    nameDayText: {
        color: "#FFF",
        fontSize: 18,
    },
    perDay: {
        height: 30,
        margin: 5,
        marginLeft: 25
    },
    perDayText: {
        fontSize: 17,
        width: 200,
    },
    sumContainer: {
        width: 120,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginLeft: 25
    },
    sumText: {
        fontSize: 18,
    },
    btnMore: {
        width: 151,
        alignSelf: "flex-end",
    },
    btnAgree: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
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