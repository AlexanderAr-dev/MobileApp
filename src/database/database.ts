import * as SQLite from 'expo-sqlite';

const initDB = async () => {
    const db = await SQLite.openDatabaseAsync('expenses.db');

    await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Таблица месяцев
    CREATE TABLE IF NOT EXISTS months (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nameMonth TEXT NOT NULL,
      budgetMonth REAL,
      sumOnDay REAL,
      spent REAL
    );

    -- Таблица дней
    CREATE TABLE IF NOT EXISTS days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      incomeSum REAL,
      expenseSum REAL,
      monthId INTEGER,
      FOREIGN KEY(monthId) REFERENCES months(id)
    );

    -- Таблица расходов
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time TEXT NOT NULL,
      category TEXT,
      description TEXT,
      cost REAL,
      location TEXT,
      affect INTEGER, -- SQLite не поддерживает boolean, используем 0/1
      dayId INTEGER,
      FOREIGN KEY(dayId) REFERENCES days(id)
    );
  `);
};

initDB().catch((err) => console.error("Error initializing DB:", err));
