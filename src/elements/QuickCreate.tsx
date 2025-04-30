import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CheckBoxWithText } from "../ui/CheckBoxWithText";
import { useState } from "react";
import { addExpense, ensureCurrentMonthExists, getOrCreateTodayDayId } from "../utils/database"; // Убедитесь, что импортировали getOrCreateTodayDayId

export default function QuickCreate({ monthId }: { monthId: number }) { // Принимаем monthId как пропс
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');

    // Получаем текущую дату в формате "ДД/ММ"
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Функция для создания расхода
    const handleCreate = async () => {
        if (!title || !cost) {
            Alert.alert('Пожалуйста, заполните название и сумму');
            return;
        }

        try {
            // Убедимся, что текущий месяц существует
            await ensureCurrentMonthExists();

            // Получаем или создаём ID дня для текущего месяца
            const dayId = await getOrCreateTodayDayId(monthId);  // Используем нашу новую функцию
            if (!dayId) {
                Alert.alert('Ошибка: день не найден');
                return;
            }

            const time = now.toTimeString().split(' ')[0].slice(0, 5); // ЧЧ:ММ

            // Добавляем расход
            await addExpense(
                {
                    time,
                    category: 'Не указано',
                    description: title,
                    cost: parseFloat(cost),
                    location: '',
                    affect: !isAgreed,
                },
                dayId
            );

            // Очищаем форму
            setTitle('');
            setCost('');
            setIsAgreed(false);
            Alert.alert('Расход добавлен!');
        } catch (e) {
            console.error(e);
            Alert.alert('Ошибка при добавлении расхода');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.currentDay}>
                <Text style={styles.currentDayText}>{dateStr}</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Название"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Сумма"
                    value={cost}
                    onChangeText={setCost}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.check}>
                <CheckBoxWithText
                    label="Не влиять на бюджет?"
                    checked={isAgreed}
                    onChange={setIsAgreed}
                />
            </View>
            <View style={styles.btnAgree}>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: 312,
        height: 310,
        backgroundColor: "#e1e1e1",
        borderRadius: 15,
        marginBottom: 20,
    },
    currentDay: {
        width: 102,
        height: 47,
        borderRadius: 15,
        backgroundColor: "#2DA1F4",
        color: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    currentDayText: {
        color: "#FFF",
        fontSize: 18,
    },
    inputs: {
        alignItems: "center",
    },
    input: {
        width: 258,
        height: 58,
        margin: 12,
        borderWidth: 0.5,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#f3efef",
    },
    check: {
        justifyContent: "center",
        alignItems: "center",
    },
    btnAgree: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 70,
        height: 38,
        backgroundColor: "#2DA1F4",
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
});
