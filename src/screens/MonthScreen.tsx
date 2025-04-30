import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from "@react-navigation/native";
import {IMonth} from "../types/IMonth";
import {ListOfDays} from "../elements/ListOfDays";
import {useState} from "react";


export function MonthScreen() {
    const route = useRoute();
    const { month } = route.params as { month: IMonth };

    // Проверка на отсутствие данных месяца
    if (!month) {
        return <Text>Данные месяца не найдены</Text>;
    }

    const [isVisible, setIsVisible] = useState(false);

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.container}>
                <View style={styles.monthContainer}>
                    <View style={styles.upContainer}>
                        <View  style={styles.nameMonth}>
                            <Text style={styles.nameMonthText}>
                                {month.nameMonth}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.diagramBtn} onPress={() => setIsVisible(!isVisible)}>
                            <Text style={styles.diagramText}>
                                {isVisible ? 'Скрыть диаграмму' : 'Показать диаграмму'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isVisible && (
                        <View style={styles.diagramContainer}>
                            <View>
                                <View style={[styles.diagramLine, {backgroundColor: '#e82f2f', width: 200}]}></View>
                                <View style={[styles.diagramLine, {backgroundColor: '#2DA1F4', width: 150}]}></View>
                                <View style={[styles.diagramLine, {backgroundColor: '#8fe82f', width: 90}]}></View>
                                <View style={[styles.diagramLine, {backgroundColor: '#e8c32f', width: 90}]}></View>
                                <View style={[styles.diagramLine, {backgroundColor: '#e8702f', width: 40}]}></View>
                            </View>
                            <View style={styles.categoryContainer}>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                                        <View style={[styles.categoryItem, {backgroundColor: '#e82f2f'}]}>
                                            <Text>Транспорт</Text>
                                        </View>
                                        <View style={[styles.categoryItem, {backgroundColor: '#2DA1F4'}]}>
                                            <Text>Прордукты</Text>
                                        </View>
                                        <View style={[styles.categoryItem, {backgroundColor: '#8fe82f'}]}>
                                            <Text>Развлечения</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        <View style={[styles.categoryItem, {backgroundColor: '#e8c32f'}]}>
                                            <Text>Остальное</Text>
                                        </View>
                                        <View style={[styles.categoryItem, {backgroundColor: '#e8702f'}]}>
                                            <Text>Переводы</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>
                                Бюджет: {month.budgetMonth}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>
                                Сумма на день: {month.sumOnDay}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>
                                Потрачено: {month.spent}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <ListOfDays currentMonth={month.id}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginTop: 10,
        marginBottom: 20,
    },
    monthContainer: {
        width: 360,
        height: "auto",
        backgroundColor: '#efefef',
        borderRadius: 15,
    },
    upContainer: {
        flexDirection: "row", // Элементы располагаются в строку
        justifyContent: "space-between", // Распределение пространства между элементами
        alignItems: "center", // Вертикальное выравнивание
        marginBottom: 20,
    },
    nameMonth: {
        width: 150,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    nameMonthText: {
        color: "#FFF",
        fontSize: 18,
    },
    diagramBtn: {
        width: 150,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    diagramText: {
        color: "#FFF",
        fontSize: 18,
    },
    info: {
        margin: 10,
        backgroundColor: "#dadada",
        borderRadius: 15,
        width: '90%',
        height: 60,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5,
        paddingLeft: 10,
    },
    infoText: {
        color: "#000000",
        fontSize: 18,
    },
    diagramContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    diagramLine: {
        height: 20,
        marginBottom: 5,
        borderRadius: 15,
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
});
