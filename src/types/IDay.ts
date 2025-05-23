import {IExpense} from "./IExpense";

export interface IDay {
    id: number;
    date: string;
    expenseSum: number;
    expenses: IExpense[];
}