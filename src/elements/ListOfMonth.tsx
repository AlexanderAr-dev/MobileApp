import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { useEffect, useState } from "react";
import MonthItem from "./MonthItem";
import { IMonth } from "../types/IMonth";
import { getAllMonths } from "../utils/database";

export default function ListOfMonth() {
    const [months, setMonths] = useState<IMonth[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMonths = async () => {
            try {
                const monthsFromDb = await getAllMonths();
                setMonths(monthsFromDb);
                setLoading(false);
            } catch (e) {
                console.error("Ошибка загрузки месяцев:", e);
                setLoading(false);
            }
        };

        fetchMonths();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    if (months.length === 0) {
        return (
            <Text>Месяцы не найдены</Text>
        );
    }

    return (
        <FlatList style={styles.container} data={months} renderItem={({item}) => (
            <MonthItem
                id={item.id}
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
