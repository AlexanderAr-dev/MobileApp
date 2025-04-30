import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StrictMode, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoadScreen from './screens/LoadScreen';
import { MonthScreen } from './screens/MonthScreen';
import { MainScreen } from './screens/MainScreen';
import { DayScreen } from './screens/DayScreen';
import { CreateExpenseScreen } from './screens/CreateExpenseScreen';
import { BottomMenu } from './ui/BottomMenu';
import {deleteTwoMonths, ensureCurrentMonthExists, initDB} from './utils/database';
import {AppProvider} from "./AppContext";
import {IMonth} from "./types/IMonth";
import {IDay} from "./types/IDay";
import {IExpense} from "./types/IExpense";
import {ExpenseScreen} from "./screens/ExpenseScreen";
import {EditExpenseScreen} from "./screens/EditExpenseScreen";


export type RootStackParamList = {
    MonthScreen: { month: IMonth };
    DayScreen: { day: IDay };
    CreateExpenseScreen: { dayId: number };
    ExpenseScreen: { expense: IExpense };
    MainScreen: undefined;
    EditExpenseScreen: { expense: IExpense };
};

export function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const [isLoading, setIsLoading] = useState(true);
    const [isDBReady, setIsDBReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, []);

    useEffect(() => {
        const prepareDatabase = async () => {
            try {
                await initDB();
                await ensureCurrentMonthExists();
                setIsDBReady(true);
            } catch (e) {
                console.error('Ошибка инициализации базы:', e);
            }
        };

        prepareDatabase();
    }, []);

    if (isLoading) {
        return <LoadScreen />;
    }

    if (!isDBReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <StrictMode>
            <AppProvider>  {/* Оборачиваем всё в провайдер */}
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{
                        headerStyle: { backgroundColor: '#ffffff' },
                    }} id={undefined}>
                        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Главная страница' }} />
                        <Stack.Screen name="MonthScreen" component={MonthScreen} options={{ title: 'Страница месяца' }} />
                        <Stack.Screen name="DayScreen" component={DayScreen} options={{ title: 'Страница дня' }} />
                        <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} options={{ title: 'Страница расхода' }} />
                        <Stack.Screen name="CreateExpenseScreen" component={CreateExpenseScreen} options={{ title: 'Создание расхода' }} />
                        <Stack.Screen name="EditExpenseScreen" component={EditExpenseScreen} options={{ title: 'Изменение расхода' }} />
                    </Stack.Navigator>
                    <BottomMenu />
                </NavigationContainer>
            </AppProvider>
        </StrictMode>
    );
}
