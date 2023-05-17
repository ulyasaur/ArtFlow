import { Exhibition } from "./exhibition";

export interface Room {
    roomId: number;
    name: string;
    exhibitionId: number;
    exhibition: Exhibition;
    numberOfPieces: number;
    maxNumberOfPieces: number;
}