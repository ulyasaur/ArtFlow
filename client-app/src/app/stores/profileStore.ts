import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.currentUser && this.profile) {
            return store.userStore.currentUser.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.uploading = true;

        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.firstName && profile.firstName !==
                    store.userStore.currentUser?.firstName) {
                    store.userStore.setFirstName(profile.firstName);
                }
                if (profile.lastName && profile.lastName !==
                    store.userStore.currentUser?.lastName) {
                    store.userStore.setFirstName(profile.lastName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.uploading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    uploadProfilePicture = async (file: Blob) => {
        this.uploading = true;

        try {
            const response = await agent.Profiles.uploadProfilePicture(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.image = photo;
                    store.userStore.setImage(photo);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
}