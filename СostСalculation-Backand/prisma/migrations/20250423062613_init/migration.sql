-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "nameMonth" TEXT NOT NULL,
    "budgetMonth" DOUBLE PRECISION NOT NULL,
    "sumOnDay" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "incomeSum" DOUBLE PRECISION NOT NULL,
    "expenseSum" DOUBLE PRECISION NOT NULL,
    "monthId" INTEGER NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "affect" BOOLEAN NOT NULL,
    "dayId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
