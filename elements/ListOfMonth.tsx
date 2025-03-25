import {FlatList} from "react-native";
import {months} from "../constants/month";
import MonthItem from "./MonthItem";

export default function  ListOfMonth() {

    return (
        <FlatList style={styles.container} data={months} renderItem={({item}) => (
            <MonthItem
                nameMonth={item.nameMonth}
                budgetMonth={item.budgetMonth}
                sumOnDay={item.sumOnDay}
                spent={item.spent}
                days={item.days}
            />
        )}
        />
    )
}

const styles = {
    container: {
        marginBottom: 50,
    }
}