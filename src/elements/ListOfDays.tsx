import {FlatList} from "react-native";
import {DayItem} from "./DayItem";
import {IDay} from "../types/IDay";

interface ListOfDaysProps {
    days: IDay[];
}

export function ListOfDays({ days }: ListOfDaysProps) {
    return (
        <FlatList
            style={styles.container}
            data={days}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => (
                <DayItem
                    date={item.date}
                    incomeSum={item.incomeSum}
                    expenseSum={item.expenseSum}
                    expenses={item.expenses}
                />
            )}
        />
    );
}

const styles = {
    container: {
        marginBottom: 50,
    }
}