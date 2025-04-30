import {FlatList} from "react-native";
import {IExpense} from "../types/IExpense";
import {ExpenseItem} from "./ExpenseItem";
import {useEffect, useState} from "react";
import {getExpensesForDay} from "../utils/database";

interface ListOfExpenseProps {
    currentDay: number;
}

export  function  ListOfExpense({currentDay}: ListOfExpenseProps) {
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const expenseFromDb = await getExpensesForDay(currentDay);
                setExpenses(expenseFromDb);
                setLoading(false);
            } catch (e) {
                console.error("Ошибка загрузки месяцев:", e);
                setLoading(false);
            }
        };

        fetchExpense();
    }, []);

    return (
        <FlatList
            style={styles.container}
            data={expenses}
            renderItem={({ item }) => (
                <ExpenseItem
                    id={item.id}
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