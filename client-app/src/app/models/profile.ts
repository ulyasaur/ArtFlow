import { Photo } from "./photo";

export interface Profile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    image?: Photo;
    background?: Photo;
    bio?: string;
}