import { Artpiece } from "./artpiece";
import { Exhibition } from "./exhibition";
import { State } from "./state";
import { User } from "./user";

export interface Order {
    orderId: number;
    seller: User;
    customer: User;
    driver: User | null;
    artpiece: Artpiece;
    exhibition: Exhibition;
    adress: string;
    status: number;
    updatedOn: Date;
    isStateOk: boolean;
    latestState: State;
}

export class OrderFormValues {
    artpieceId: string;
    exhibitionId: number;
    adress: string;

    constructor(artpieceId: string,
        exibitionId: number,
        adress: string){
            this.artpieceId = artpieceId;
            this.exhibitionId = exibitionId,
            this.adress = adress;
        }
}