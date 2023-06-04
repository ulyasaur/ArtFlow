import { makeAutoObservable, runInAction } from "mobx";
import { Exhibition } from "../models/exhibition";
import agent from "../api/agent";
import { router } from "../router/router";

export default class ExhibitionStore {
    exhibitions: Exhibition[] | null = null;
    exhibition: Exhibition | null = null;
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

    loadExhibition = async (exhibitionId: string) => {
        this.loading = true;
        try {
            const exhibition = await agent.Exhibitions.getExhibition(exhibitionId);
            runInAction(() => {
                this.exhibition = exhibition;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    addExhibition = async (exhibition: Exhibition)  => {
        this.loading = true;
        try {
            console.log(exhibition);
            const newexhibition = await agent.Exhibitions.addExhibition(exhibition);
            runInAction(() => {
                this.exhibitions?.push(newexhibition);
                this.exhibition = newexhibition;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateExhibition = async (exhibition: Exhibition)  => {
        this.loading = true;
        try {
            await agent.Exhibitions.updateExhibition(exhibition);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteExhibition = async (exhibitionId: number)  => {
        this.loading = true;
        try {
            await agent.Exhibitions.deleteExhibition(exhibitionId);
            runInAction(() => {
                this.exhibitions = this.exhibitions!.filter(e => e.exhibitionId !== exhibitionId);
                this.loading = false;
            });
            router.navigate(`/exhibitions`);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}