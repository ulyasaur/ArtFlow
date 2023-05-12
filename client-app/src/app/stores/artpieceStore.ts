import { makeAutoObservable, runInAction } from "mobx";
import { Artpiece, ArtpieceFormValues } from "../models/artpiece";
import agent from "../api/agent";
import { router } from "../router/router";

export default class ArtpieceStore {
    artpieces: Artpiece[] | null = null;
    artpiece: Artpiece | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadOwnerArtpieces = async (userId: string) => {
        this.loading = true;
        try {
            const artpieces = await agent.Artpieces.getOwnerArtpieces(userId);
            runInAction(() => {
                this.artpieces = artpieces;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadAvailableArtpieces = async () => {
        this.loading = true;
        try {
            const artpieces = await agent.Artpieces.getAvailable();
            runInAction(() => {
                this.artpieces = artpieces;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadArtpiece = async (artpieceId: string) => {
        this.loading = true;
        try {
            const artpiece = await agent.Artpieces.getArtpiece(artpieceId);
            runInAction(() => {
                this.artpiece = artpiece;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    addArtpiece = async (artpiece: ArtpieceFormValues) => {
        this.loading = true;
        try {
            const added = (await agent.Artpieces.addArtpiece(artpiece)).data;
            runInAction(() => {
                this.artpieces?.push(added);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateArtpiece = async (artpiece: ArtpieceFormValues) => {
        this.loading = true;
        try {
            const updated = await agent.Artpieces.updateArtpiece(artpiece);
            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
    
    uploadArtpiecePicture = async (file: Blob, artpieceId: string) => {
        this.loading = true;

        try {
            const response = await agent.Artpieces.uploadArtpiecePicture(artpieceId, file);
            const photo = response.data;
            runInAction(() => {
                if (this.artpiece) {
                    this.artpiece.photo = photo;
                }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteArtpiece = async (artpieceId: string) => {
        this.loading = true;
        try {
            await agent.Artpieces.deleteArtpiece(artpieceId);
            runInAction(() => {
                this.artpieces = this.artpieces!.filter(e => e.artpieceId !== artpieceId);
                this.loading = false;
            });
            router.navigate(`/artpieces`);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}