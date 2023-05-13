import { Photo } from "./photo";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    photo?: Photo;    
    bio?: string;
}

export class User implements User {
    constructor (
        id: string, 
        username: string, 
        firstName: string,
        lastName: string,
        photo?: Photo,
        bio?: string){
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.photo = photo;
            this.bio = bio;
    }
}