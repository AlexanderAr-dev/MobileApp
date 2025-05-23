import {ActivityIndicator, FlatList, Text} from "react-native";
import {DayItem} from "./DayItem";
import {IDay} from "../types/IDay";
import {useEffect, useState} from "react";
import {getDaysForMonth} from "../utils/database";

interface ListOfDaysProps {
    currentMonth: number;
}

export function ListOfDays({ currentMonth }: ListOfDaysProps) {
    const [days, setDays] = useState<IDay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDays = async () => {
            try {
                const dayFromDb = await getDaysForMonth(currentMonth);
                setDays(dayFromDb);
                setLoading(false);
            } catch (e) {
                console.error("Ошибка загрузки месяцев:", e);
                setLoading(false);
            }
        };

        fetchDays();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    if (days.length === 0) {
        return (
            <Text>Дни не найдены</Text>
        );
    }
    return (
        <FlatList
            style={styles.container}
            data={days}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => (
                <DayItem
                    id={item.id}
                    date={item.date}
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