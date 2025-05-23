import {IDay} from "./IDay";

export interface IMonth {
    id: number;
    nameMonth: string;
    spent: number;
    days: IDay[];
}