import { User } from "./user";

export interface Exhibition {
    exhibitionId: number;
    name: string;
    description: string;
    organiserId: string;
    organiser: User;
    startDate: string;
    endDate: string;
    adress: string;
}