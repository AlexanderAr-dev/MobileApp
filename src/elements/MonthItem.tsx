import {StyleSheet, View, Text, Button} from "react-native";
import {IMonth} from "../types/IMonth";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import { StackNavigationProp } from '@react-navigation/stack';

export default function  MonthItem(props: IMonth) {
    type NavigationProp = StackNavigationProp<RootStackParamList, 'MonthScreen'>;
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View  style={styles.nameMonth}>
                <Text style={styles.nameMonthText}>
                    {props.nameMonth}
                </Text>
            </View>
            <View style={styles.spentPerMonth}>
                <Text style={styles.spentPerMonthText}>
                    Расходы за месяц
                </Text>
            </View>
            <View style={styles.spent}>
                <Text style={styles.spentText}>
                    {props.spent}
                </Text>
            </View>
            <View style={styles.btnMore}>
                <Button
                    title={'Подробнее'}
                    onPress={() => navigation.navigate('MonthScreen', {month: props})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 312,
        height: 225,
        backgroundColor: "#d8d8d8",
        borderRadius: 15,
        marginBottom: 20,
    },
    nameMonth: {
        width: 117,
        height: 44,
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
    spentPerMonth: {
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5,
    },
    spentPerMonthText: {
        fontSize: 18,
        width: 100,
    },
    spent: {
        width: 150,
        height: 40,
        borderRadius: 15,
        backgroundColor: "rgba(240,33,33,0.66)",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginBottom: 24,
    },
    spentText: {
        fontSize: 18,
    },
    btnMore: {
        width: 151,
        alignSelf: "flex-end",
    }

});
