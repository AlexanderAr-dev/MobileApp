import {StyleSheet, View, Text, Button} from "react-native";
import {IExpense} from "../types/IExpense";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../App";
import {useNavigation} from "@react-navigation/native";

export  function  ExpenseItem(props: IExpense) {
    type NavigationProp = StackNavigationProp<RootStackParamList, 'DayScreen'>;
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.flexContainer}>
                <View  style={styles.time}>
                    <Text style={styles.timeText}>
                        {props.time}
                    </Text>
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>
                        {props.category}
                    </Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>
                    {props.description}
                </Text>
            </View>
            <View style={styles.costContainer}>
                <Text style={styles.costText}>
                    {props.cost}
                </Text>
            </View>
            <View style={styles.btnMore}>
                <Button
                    title={'Подробнее'}
                    onPress={() => navigation.navigate('ExpenseScreen', {expense: props})} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 312,
        height: "auto",
        backgroundColor: "#e1e1e1",
        borderRadius: 15,
        marginBottom: 20,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Равномерное распределение
        alignItems: 'center', // Выравнивание по центру
    },
    time: {
        width: 117,
        height: 44,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    timeText: {
        color: "#FFF",
        fontSize: 18,
    },
    categoryContainer: {
        height: 30,
        width: 100,
        margin: 5,
        backgroundColor: '#a9acac',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        fontSize: 17,
    },
    description: {
        width: 120,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    descriptionText: {
        fontSize: 18,
    },
    costContainer: {
        width: 120,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        backgroundColor: '#c7c8c8',
    },
    costText: {
        fontSize: 18,
    },
    btnMore: {
        width: 151,
        alignSelf: "flex-end",
    }
});
