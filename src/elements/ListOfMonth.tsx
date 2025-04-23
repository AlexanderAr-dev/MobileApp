import {ActivityIndicator, Alert, FlatList} from "react-native";
import MonthItem from "./MonthItem";
import {useEffect, useState} from "react";
import {IMonth} from "../types/IMonth";
import {fetchMonths} from "../api/api";

export default function  ListOfMonth() {
    const [months, setMonths] = useState<IMonth[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMonths = async () => {
            try {
                const data = await fetchMonths();
                setMonths(data);
            } catch (error) {
                console.error("Ошибка загрузки месяцев:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMonths();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#000" />;

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
