import { makeAutoObservable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Auth } from "../models/auth";
import { Photo } from "../models/photo";
import { User } from "../models/user";
import { router } from "../router/router";

export default class UserStore {
    currentUser: User | null = null;
    token: string | null = localStorage.getItem("jwt");
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem("jwt", token);
                } else {
                    localStorage.removeItem("jwt");
                }
            }
        );
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    login = async (creds: Auth) => {
        try {
            const authResponse = await agent.Account.login(creds);
            this.setToken(authResponse.token);

            runInAction(() => {
                this.currentUser = authResponse.user;
            });

            router.navigate(`/profile/${this.currentUser?.username}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: Auth) => {
        try {
            await agent.Account.register(creds);
            await this.login(creds);
            toast.success("You're successfully registered!");
        } catch (error) {
            console.log(error);
        }
    }

    logout = () => {
        this.setToken(null);
        this.currentUser = null;
        router.navigate("/");
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();

            runInAction(() => {
                this.currentUser = user;
            });
        } catch (error) {
            console.log(error);
        }
    }

    setFirstName = (firstName: string) => {
        if (this.currentUser) {
            this.currentUser.firstName = firstName;
        }
    }

    setLastNameName = (lastName: string) => {
        if (this.currentUser) {
            this.currentUser.lastName = lastName;
        }
    }

    setImage = (photo: Photo) => {
        if (this.currentUser) {
            this.currentUser.photo = photo;
        }
    }
}
