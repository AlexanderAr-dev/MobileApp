import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { IExpense } from '../types/IExpense';
import { IDay } from '../types/IDay';
import {IMonth} from "../types/IMonth";

let db: SQLiteDatabase | null = null;

export const initDB = async () => {
    db = await openDatabaseAsync('months.db');

    await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS months (
      id INTEGER PRIMARY KEY NOT NULL,
      nameMonth TEXT NOT NULL,
      budgetMonth REAL,
      sumOnDay REAL,
      spent REAL
    );

    CREATE TABLE IF NOT EXISTS days (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      incomeSum REAL,
      expenseSum REAL,
      monthId INTEGER,
      FOREIGN KEY (monthId) REFERENCES months(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY NOT NULL,
      time TEXT,
      category TEXT,
      description TEXT,
      cost REAL,
      location TEXT,
      affect INTEGER,
      dayId INTEGER,
      FOREIGN KEY (dayId) REFERENCES days(id) ON DELETE CASCADE
    );
  `);
};

export const ensureCurrentMonthExists = async () => {
    if (!db) return;

    const now = new Date();
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const nameMonth = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const existing = await db.getFirstAsync<{ id: number }>(
        'SELECT id FROM months WHERE nameMonth = ?',
        [nameMonth]
    );

    let monthId: number;

    if (!existing) {
        const result = await db.runAsync(
            `INSERT INTO months (nameMonth, budgetMonth, sumOnDay, spent) VALUES (?, ?, ?, ?)`,
            [nameMonth, 0, 0, 0]
        );
        monthId = result.lastInsertRowId!;
        console.log(`✅ Добавлен месяц: ${nameMonth}`);
    } else {
        monthId = existing.id;
    }

    await ensureTodayExists(monthId);
};

export const ensureTodayExists = async (monthId: number) => {
    if (!db) return;

    const today = new Date().toISOString().split('T')[0];

    const existing = await db.getFirstAsync<{ id: number }>(
        `SELECT id FROM days WHERE date = ? AND monthId = ?`,
        [today, monthId]
    );

    if (!existing) {
        await db.runAsync(
            `INSERT INTO days (date, incomeSum, expenseSum, monthId) VALUES (?, ?, ?, ?)`,
            [today, 0, 0, monthId]
        );
        console.log(`📅 Добавлен день: ${today}`);
    }
};

export const getOrCreateTodayDayId = async (monthId: number): Promise<number | null> => {
    if (!db) db = await openDatabaseAsync('months.db');

    const today = new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате YYYY-MM-DD

    // Проверим, существует ли день для текущей даты в базе данных
    const existing = await db.getFirstAsync<{ id: number }>(
        `SELECT id FROM days WHERE date = ? AND monthId = ?`,
        [today, monthId]
    );

    if (existing) {
        return existing.id; // Если день существует, возвращаем его ID
    }

    // Если день не существует, создаём новый
    const result = await db.runAsync(
        `INSERT INTO days (date, incomeSum, expenseSum, monthId) VALUES (?, ?, ?, ?)`,
        [today, 0, 0, monthId]
    );

    const newDayId = result.lastInsertRowId!;
    console.log(`📅 Добавлен день: ${today}`);
    return newDayId; // Возвращаем ID нового дня
};
// ─── CRUD для расходов ─────────────────────────
interface newExpense {
    time: string;
    category: string;
    description: string;
    cost: number;
    location: string;
    affect: boolean;
}

export const addExpense = async (expense: newExpense, dayId: number) => {
    if (!db) return;

    await db.runAsync(
        `INSERT INTO expenses (time, category, description, cost, location, affect, dayId)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            expense.time,
            expense.category,
            expense.description,
            expense.cost,
            expense.location,
            expense.affect ? 1 : 0,
            dayId,
        ]
    );
};

export const updateExpense = async (id: number, updated: Partial<IExpense>) => {
    if (!db) return;

    const fields = Object.entries(updated)
        .filter(([_, v]) => v !== undefined)
        .map(([k]) => `${k} = ?`)
        .join(', ');

    const values = Object.values(updated).map(v => (typeof v === 'boolean' ? +v : v));

    await db.runAsync(`UPDATE expenses SET ${fields} WHERE id = ?`, [...values, id]);
};

export const deleteExpense = async (id: number) => {
    if (!db) return;

    await db.runAsync(`DELETE FROM expenses WHERE id = ?`, [id]);
};

// ─── Получение данных ─────────────────────────

export const getAllMonths = async (): Promise<IMonth[]> => {
    if (!db) return [];

    const months = await db.getAllAsync<IMonth>(`
        SELECT * FROM months
    `);

    return months ?? [];
};

export const getDaysForMonth = async (monthId: number): Promise<IDay[]> => {
    if (!db) return [];

    const days = await db.getAllAsync<IDay>(
        `SELECT * FROM days WHERE monthId = ? ORDER BY date ASC`,
        [monthId]
    );

    return days;
};

export const getExpensesForDay = async (dayId: number): Promise<IExpense[]> => {
    if (!db) return [];

    const rows = await db.getAllAsync<IExpense>(
        `SELECT * FROM expenses WHERE dayId = ? ORDER BY time ASC`,
        [dayId]
    );

    return rows.map(exp => ({ ...exp, affect: !!exp.affect })); // Преобразуем affect в boolean
};

export const deleteTwoMonths = async (id1: number, id2: number) => {
    if (!db) return;
    await db.runAsync(`DELETE FROM months WHERE id IN (?, ?)`, [id1, id2]);
    console.log(`🗑 Удалены месяцы с id ${id1} и ${id2}`);
};