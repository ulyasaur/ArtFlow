import { store } from "../stores/store";
import { User } from "./user";

export interface Exhibition {
    exhibitionId: number;
    name: string;
    description: string;
    organiserId: string;
    organiser: User;
    startDate: Date;
    endDate: Date;
    adress: string;
}

export class Exhibition implements Exhibition {
    constructor() {
        this.name = "";
        this.description = "";
        this.organiserId = store.userStore.currentUser!.id;
        this.organiser = store.userStore.currentUser!;
        this.startDate = new Date();
        this.endDate = new Date();
        this.adress = "";
    }
}