import {FlatList} from "react-native";
import {IExpense} from "../types/IExpense";
import {ExpenseItem} from "./ExpenseItem";

interface ListOfExpenseProps {
    expenses: IExpense[];
}

export  function  ListOfExpense({expenses}: ListOfExpenseProps) {
    return (
        <FlatList
            style={styles.container}
            data={expenses}
            renderItem={({ item }) => (
                <ExpenseItem
                    time={item.time}
                    category={item.category}
                    description={item.description}
                    cost={item.cost}
                    location={item.location}
                    affect={item.affect}
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