import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import ExhibitionStore from "./exhibitionStore";
import ArtpieceStore from "./artpieceStore";
import OrderStore from "./orderStore";
import RoomStore from "./roomStore";

interface Store {
    userStore: UserStore;
    profileStore: ProfileStore;
    exhibitionStore: ExhibitionStore;
    artpieceStore: ArtpieceStore;
    orderStore: OrderStore;
    roomStore: RoomStore;
}

export const store: Store = {
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    exhibitionStore: new ExhibitionStore(),
    artpieceStore: new ArtpieceStore(),
    orderStore: new OrderStore(),
    roomStore: new RoomStore
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}