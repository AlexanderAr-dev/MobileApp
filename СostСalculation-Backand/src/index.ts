import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Сервер работает!");
});

app.post("/seed", async (_req, res) => {
  try {
    const month = await prisma.month.create({
      data: {
        nameMonth: "Февраль",
        budgetMonth: 30000,
        sumOnDay: 1000,
        spent: 0,
      },
    });

    const day = await prisma.day.create({
      data: {
        date: "2025-02-01",
        incomeSum: 1500,
        expenseSum: 200,
        monthId: month.id,
      },
    });

    await prisma.expense.create({
      data: {
        time: "14:30",
        category: "Еда",
        description: "Обед",
        cost: 200,
        location: "Кафе",
        affect: true,
        dayId: day.id,
      },
    });

    res.status(200).json({ success: true, message: "Seed успешно выполнен" });
  } catch (err: any) {
    console.error("Ошибка при сидировании:", err); // <= покажет полную ошибку
    res.status(500).json({ error: "Ошибка при сидировании", details: err.message });
  }
});

/** ========== MONTH ROUTES ========== */

// Получить все месяцы
app.get("/months", async (_req, res) => {
  try {
    const months = await prisma.month.findMany();
    return res.status(200).json(months);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Получить один месяц
app.get("/months/:id", async (req, res) => {
  try {
    const month = await prisma.month.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!month) return res.status(404).json({ error: "Month not found" });
    return res.status(200).json(month);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/** ========== DAY ROUTES ========== */

// Получить все дни в месяце
app.get("/months/:id/days", async (req, res) => {
  try {
    const days = await prisma.day.findMany({
      where: { monthId: parseInt(req.params.id) },
    });
    return res.status(200).json(days);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Получить один день
app.get("/days/:id", async (req, res) => {
  try {
    const day = await prisma.day.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!day) return res.status(404).json({ error: "Day not found" });
    return res.status(200).json(day);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/** ========== EXPENSE ROUTES ========== */

// Получить все расходы за день
app.get("/days/:id/expenses", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { dayId: parseInt(req.params.id) },
    });
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Получить один расход
app.get("/expenses/:id", async (req, res) => {
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    return res.status(200).json(expense);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Создать расход
app.post("/expenses", async (req, res) => {
  try {
    const { time, category, description, cost, location, affect, dayId } = req.body;
    const newExpense = await prisma.expense.create({
      data: {
        time,
        category,
        description,
        cost,
        location,
        affect,
        dayId,
      },
    });
    return res.status(201).json(newExpense);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Обновить расход
app.put("/expenses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: req.body,
    });
    return res.status(200).json(updatedExpense);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Удалить расход
app.delete("/expenses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.expense.delete({ where: { id } });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/** ========== SERVER START ========== */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
