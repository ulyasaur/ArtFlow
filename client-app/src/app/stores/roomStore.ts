import { makeAutoObservable, runInAction } from "mobx";
import { Artpiece } from "../models/artpiece";
import agent from "../api/agent";
import { router } from "../router/router";
import { Room } from "../models/room";
import { store } from "./store";

export default class RoomStore {
    rooms: Room[] | null = null;
    room: Room | null = null;
    artpieces: Artpiece[] | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadRooms = async (exhibitionId: number) => {
        this.loading = true;
        try {
            const rooms = await agent.Rooms.getExhibitionRooms(exhibitionId);
            runInAction(() => {
                this.rooms = rooms;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadRoom = async (roomId: number) => {
        this.loading = true;
        try {
            const room = await agent.Rooms.getRoom(roomId);
            runInAction(() => {
                this.room = room;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }   

    loadRoomArtpieces = async (roomId: number) => {
        this.loading = true;
        try {
            const artpieces = await agent.Artpieces.getRoomArtpieces(roomId);
            runInAction(() => {
                this.artpieces = artpieces;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    addRoom = async (room: Partial<Room>) => {
        this.loading = true;
        try {
            const added = await agent.Rooms.addRoom(room);
            runInAction(() => {
                this.rooms?.push(added);
                this.loading = false;
            });
            router.navigate(`/exhibitions/${room.exhibitionId}`);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteRoom = async (roomId: number) => {
        this.loading = true;
        try {
            await agent.Rooms.deleteRoom(roomId);
            runInAction(() => {
                this.rooms = this.rooms!.filter(e => e.roomId !== roomId);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    addArtpieceToRoom = async (roomId: number, artpieceId: string) => {
        this.loading = true;
        try {
            await agent.Rooms.addArtpieceToRoom(roomId, artpieceId);
            const artpiece = await agent.Artpieces.getArtpiece(artpieceId);
            runInAction(() => {
                this.room!.numberOfPieces++;
                store.artpieceStore!.artpieces = store.artpieceStore.artpieces!.filter(a => a.artpieceId !== artpieceId);
                this.artpieces?.push(artpiece);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteArtpieceFromRoom = async (roomId: number, artpieceId: string) => {
        this.loading = true;
        try {
            await agent.Rooms.deleteArtpieceFromRoom(roomId, artpieceId);
            runInAction(() => {
                this.room!.numberOfPieces--;
                this.artpieces = this.artpieces!.filter(a => a.artpieceId !== artpieceId);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}