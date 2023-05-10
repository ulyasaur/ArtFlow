import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import ExhibitionStore from "./exhibitionStore";

interface Store {
    userStore: UserStore;
    profileStore: ProfileStore;
    exhibitionStore: ExhibitionStore;
}

export const store: Store = {
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    exhibitionStore: new ExhibitionStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}