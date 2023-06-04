import { KeepRecommendation } from "./keepRecommendation";
import { Photo } from "./photo";
import { User } from "./user";

export interface Artpiece {
    artpieceId: string;
    photoId: string;
    photo?: Photo;  
    name: string;
    description: string;
    authorName: string;
    ownerId: string;
    owner: User;
    keepRecommendation: KeepRecommendation;
}

export class ArtpieceFormValues {
    artpieceId?: string;
    photo?: Blob | null;  
    name: string = "";
    description?: string;
    authorName?: string;
    keepRecommendationId?: number;
    minTemperature: number = 0;
    maxTemperature: number = 0;
    minHumidity: number = 0;
    maxHumidity: number = 0;
    minLight: number = 0;
    maxLight: number = 0;
}