import { Photo } from "./photo";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    image?: Photo;
}

export class User implements User {
    constructor (
        id: string, 
        username: string, 
        firstName: string,
        lastName: string,
        image?: Photo){
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.image = image;
    }
}