import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ensureCurrentMonthExists, getOrCreateTodayDayId } from './utils/database';

// Типы для контекста
interface IAppContext {
    currentMonth: string | null;
    currentDay: string | null;
    monthId: number | null;
    dayId: number | null;
    setCurrentMonth: (month: string) => void;
    setCurrentDay: (day: string) => void;
    setMonthId: (monthId: number) => void;
    setDayId: (dayId: number) => void;
}

// Тип для пропсов компонента, включая `children`
interface AppProviderProps {
    children: ReactNode; // Добавляем тип для детей компонента
}

// Создаём контекст с начальным значением
const AppContext = createContext<IAppContext | undefined>(undefined);

// Провайдер для контекста
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [currentMonth, setCurrentMonth] = useState<string | null>(null);
    const [currentDay, setCurrentDay] = useState<string | null>(null);
    const [monthId, setMonthId] = useState<number | null>(null);
    const [dayId, setDayId] = useState<number | null>(null);

    useEffect(() => {
        const init = async () => {
            // Убедимся, что месяц и день существуют
            await ensureCurrentMonthExists();
            const now = new Date();
            const currentMonthName = `${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
            const currentDayName = now.toISOString().split('T')[0];

            setCurrentMonth(currentMonthName);
            setCurrentDay(currentDayName);

            // Здесь можно получить или создать currentMonthId и currentDayId, если это нужно
            setMonthId(now.getMonth());  // Можно настроить это по нужной логике
            setDayId(now.getDate());  // Можно настроить это по нужной логике
        };

        init();
    }, []);

    return (
        <AppContext.Provider value={{
            currentMonth,
            currentDay,
            monthId,
            dayId,
            setCurrentMonth,
            setCurrentDay,
            setMonthId,
            setDayId,
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Хук для использования контекста в компонентах
export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
