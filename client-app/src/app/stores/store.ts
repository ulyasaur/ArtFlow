import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import ExhibitionStore from "./exhibitionStore";
import ArtpieceStore from "./artpieceStore";

interface Store {
    userStore: UserStore;
    profileStore: ProfileStore;
    exhibitionStore: ExhibitionStore;
    artpieceStore: ArtpieceStore;
}

export const store: Store = {
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    exhibitionStore: new ExhibitionStore(),
    artpieceStore: new ArtpieceStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}