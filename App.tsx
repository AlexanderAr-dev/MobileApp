import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MonthScreen} from "./screens/MonthScreen";
import {MainScreen} from "./screens/MainScreen";
import {StrictMode, useEffect, useState} from "react";
import LoadScreen from "./screens/LoadScreen";
import {DayScreen} from "./screens/DayScreen";
import {CreateExpenseScreen} from "./screens/CreateExpenseScreen";
import {BottomMenu} from "./ui/BottomMenu";
import {IMonth} from "./types/IMonth";
import {IDay} from "./types/IDay";

export type RootStackParamList = {
    MonthScreen: { month: IMonth };
    DayScreen: { day: IDay };
    CreateExpenseScreen,
    MainScreen,
};

export function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Задержка в 3 секунды

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, []);

    if (isLoading) {
        return <LoadScreen />;
    }

    return (
        <StrictMode>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainScreen" screenOptions={{
                    headerStyle: { backgroundColor: '#ffffff' },
                }}>
                    <Stack.Screen name="MainScreen" component={MainScreen}  options={{title: 'Главная страница'}}/>
                    <Stack.Screen name="MonthScreen" component={MonthScreen}  options={{title: 'Страница месяца'}}/>
                    <Stack.Screen name="DayScreen" component={DayScreen}  options={{title: 'Страница дня'}}/>
                    <Stack.Screen name="CreateExpenseScreen" component={CreateExpenseScreen} options={{title: 'Создание расхода'}}/>
                </Stack.Navigator>
                <BottomMenu />
            </NavigationContainer>
        </StrictMode>
    );
}