import { makeAutoObservable, runInAction } from "mobx";
import { Exhibition } from "../models/exhibition";
import agent from "../api/agent";

export default class ExhibitionStore {
    exhibitions: Exhibition[] | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadExhibitions = async (userId: string) => {
        this.loading = true;
        try {
            const exhibitions = await agent.Exhibitions.getExhibitions(userId);
            runInAction(() => {
                this.exhibitions = exhibitions;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}