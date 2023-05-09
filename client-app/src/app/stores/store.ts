import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";

interface Store {
    userStore: UserStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    userStore: new UserStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}