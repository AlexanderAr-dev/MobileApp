import {IExpense} from "./IExpense";

export interface IDay {
    date: string;
    incomeSum: number;
    expenseSum: number;
    expenses: IExpense[];
}