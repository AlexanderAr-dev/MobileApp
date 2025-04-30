import {IExpense} from "./IExpense";

export interface IDay {
    id: number;
    date: string;
    incomeSum: number;
    expenseSum: number;
    expenses: IExpense[];
}