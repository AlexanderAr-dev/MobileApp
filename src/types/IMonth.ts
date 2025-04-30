import {IDay} from "./IDay";

export interface IMonth {
    id: number;
    nameMonth: string;
    budgetMonth: number;
    sumOnDay: number;
    spent: number;
    days: IDay[];
}