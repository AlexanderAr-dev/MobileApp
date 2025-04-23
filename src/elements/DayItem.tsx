import {StyleSheet, View, Text, Button} from "react-native";
import {IDay} from "../types/IDay";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../App";
import {useNavigation} from "@react-navigation/native";

export  function  DayItem(props: IDay) {
    type NavigationProp = StackNavigationProp<RootStackParamList, 'MonthScreen'>;
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View  style={styles.nameDay}>
                <Text style={styles.nameDayText}>
                    {props.date}
                </Text>
            </View>

            <View style={styles.perDay}>
                <Text style={styles.perDayText}>
                    Расходы за день
                </Text>
            </View>
            <View style={[styles.sumContainer, {backgroundColor: "rgba(218,58,58,0.78)"}]}>
                <Text style={styles.sumText}>
                    {props.expenseSum}
                </Text>
            </View>

            <View style={styles.perDay}>
                <Text style={styles.perDayText}>
                    Доходы за день
                </Text>
            </View>
            <View style={[styles.sumContainer, {backgroundColor: "#7df42d"}]}>
                <Text style={styles.sumText}>
                    {props.incomeSum}
                </Text>
            </View>
            <View style={styles.btnMore}>
                <Button
                    title={'Подробнее'}
                    onPress={() => navigation.navigate('DayScreen', {day: props})} />
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
    nameDay: {
        width: 117,
        height: 44,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    nameDayText: {
        color: "#FFF",
        fontSize: 18,
    },
    perDay: {
        height: 30,
        margin: 5
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
    },
    sumText: {
        fontSize: 18,
    },
    btnMore: {
        width: 151,
        alignSelf: "flex-end",
    }
});
