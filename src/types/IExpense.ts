export interface IExpense {
    id: number;
    time: string;
    category: string;
    description: string;
    cost: number;
    location: string;
    affect: boolean;
    dayId: number;
}