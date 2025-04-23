import {IDay} from "./IDay";

export interface IMonth {
    nameMonth: string;
    budgetMonth: number;
    sumOnDay: number;
    spent: number;
    days: IDay[];
}