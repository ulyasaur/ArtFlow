import { Photo } from "./photo";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    image?: Photo;    
    bio?: string;
}

export class User implements User {
    constructor (
        id: string, 
        username: string, 
        firstName: string,
        lastName: string,
        image?: Photo,
        bio?: string){
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.image = image;
            this.bio = bio;
    }
}