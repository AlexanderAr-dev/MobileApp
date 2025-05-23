import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { IExpense } from '../types/IExpense';
import { IDay } from '../types/IDay';
import { IMonth } from "../types/IMonth";

let db: SQLiteDatabase | null = null;

export const initDB = async () => {
    db = await openDatabaseAsync('months.db');

    await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS months (
      id INTEGER PRIMARY KEY NOT NULL,
      nameMonth TEXT NOT NULL,
      spent REAL -- 🔧 убрано: budgetMonth, sumOnDay
    );

    CREATE TABLE IF NOT EXISTS days (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      expenseSum REAL, -- 🔧 убрано: incomeSum
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
            `INSERT INTO months (nameMonth, spent) VALUES (?, ?)`, // 🔧 убрано: budgetMonth, sumOnDay
            [nameMonth, 0]
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
            `INSERT INTO days (date, expenseSum, monthId) VALUES (?, ?, ?)`, // 🔧 убрано: incomeSum
            [today, 0, monthId]
        );
        console.log(`📅 Добавлен день: ${today}`);
    }
};

export const getOrCreateTodayDayId = async (monthId: number): Promise<number | null> => {
    if (!db) db = await openDatabaseAsync('months.db');

    const today = new Date().toISOString().split('T')[0];

    const existing = await db.getFirstAsync<{ id: number }>(
        `SELECT id FROM days WHERE date = ? AND monthId = ?`,
        [today, monthId]
    );

    if (existing) {
        return existing.id;
    }

    const result = await db.runAsync(
        `INSERT INTO days (date, expenseSum, monthId) VALUES (?, ?, ?)`,
        [today, 0, monthId]
    );

    const newDayId = result.lastInsertRowId!;
    console.log(`📅 Добавлен день: ${today}`);
    return newDayId;
};

// ─── CRUD для расходов ─────────────────────────
interface newExpense {
    time: string;
    category: string | null;
    description: string;
    cost: number;
    location: string | null;
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

    await recalculateSums(dayId); // 🔧 обновить суммы
};

export const updateExpense = async (id: number, updated: Partial<IExpense>) => {
    if (!db) return;

    const old = await db.getFirstAsync<IExpense>(`SELECT * FROM expenses WHERE id = ?`, [id]);
    if (!old) return;

    const fields = Object.entries(updated)
        .filter(([_, v]) => v !== undefined)
        .map(([k]) => `${k} = ?`)
        .join(', ');

    const values = Object.values(updated).map(v => (typeof v === 'boolean' ? +v : v));

    await db.runAsync(`UPDATE expenses SET ${fields} WHERE id = ?`, [...values, id]);

    await recalculateSums(old.dayId); // 🔧 обновить суммы
};

export const deleteExpense = async (id: number) => {
    if (!db) return;

    const existing = await db.getFirstAsync<IExpense>(`SELECT * FROM expenses WHERE id = ?`, [id]);
    if (!existing) return;

    await db.runAsync(`DELETE FROM expenses WHERE id = ?`, [id]);

    await recalculateSums(existing.dayId); // 🔧 обновить суммы
};

// 🔧 Пересчёт сумм после изменений
export const recalculateSums = async (dayId: number) => {
    if (!db) return;

    const day = await db.getFirstAsync<{ monthId: number }>(
        `SELECT monthId FROM days WHERE id = ?`,
        [dayId]
    );
    if (!day) return;

    // Получаем сумму расходов, которые влияют на бюджет
    const { sum = 0 } = await db.getFirstAsync<{ sum: number }>(
        `SELECT SUM(cost) as sum FROM expenses WHERE dayId = ? AND affect = 1`,
        [dayId]
    ) ?? {};

    await db.runAsync(`UPDATE days SET expenseSum = ? WHERE id = ?`, [sum, dayId]);

    const { monthSum = 0 } = await db.getFirstAsync<{ monthSum: number }>(
        `SELECT SUM(expenseSum) as monthSum FROM days WHERE monthId = ?`,
        [day.monthId]
    ) ?? {};

    await db.runAsync(`UPDATE months SET spent = ? WHERE id = ?`, [monthSum, day.monthId]);
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

    return rows.map(exp => ({ ...exp, affect: !!exp.affect }));
};

export const deleteTwoMonths = async (id1: number, id2: number) => {
    if (!db) return;
    await db.runAsync(`DELETE FROM months WHERE id IN (?, ?)`, [id1, id2]);
    console.log(`🗑 Удалены месяцы с id ${id1} и ${id2}`);
};
