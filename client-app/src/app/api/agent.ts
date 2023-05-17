import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Auth } from "../models/auth";
import AuthResponse from "../models/authResponse";
import { User } from "../models/user";
import { router } from "../router/router";
import { store } from "../stores/store";
import { Photo } from "../models/photo";
import { Exhibition } from "../models/exhibition";
import { Artpiece, ArtpieceFormValues } from "../models/artpiece";
import { Order, OrderFormValues } from "../models/order";
import { Room } from "../models/room";

axios.defaults.baseURL = "http://localhost:5244/api";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.interceptors.request.use(config => {
    const token = store.userStore.token;

    if (token && config.headers) {
        (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);

    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                router.navigate("/not-found");
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised');
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate("/not-found")
            break;
        case 500:
            toast.error("Server error");
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
    login: (user: Auth) => requests.post<AuthResponse>("/account/login", user),
    register: (user: Auth) => requests.post("/account/register", user),
    current: () => requests.get<User>("/account/current")
}

const Profiles = {
    get: (username: string) => requests.get<User>(`/users/${username}`),
    updateProfile: (profile: Partial<User>) => requests.put(`/users`, profile),
    uploadProfilePicture: (file: Blob) => {
        let formData = new FormData();
        formData.append("File", file);
        return axios.post<Photo>("/users/profilePicture", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
}

const Exhibitions = {
    getExhibitions: (userId: string) => requests.get<Exhibition[]>(`/exhibitions/organiser/${userId}`),
    getExhibition: (exhibitionId: string) => requests.get<Exhibition>(`/exhibitions/${exhibitionId}`),
    addExhibition: (exhibition: Exhibition) => requests.post<Exhibition>(`/exhibitions`, exhibition),
    updateExhibition: (exhibition: Exhibition) => requests.put<Exhibition>(`/exhibitions`, exhibition),
    deleteExhibition: (exhibitionId: number) => requests.del(`/exhibitions/${exhibitionId}`)
}

const Artpieces = {
    getAvailable: () => requests.get<Artpiece[]>(`/artpieces/available`),
    getOwnerArtpieces: (userId: string) => requests.get<Artpiece[]>(`/artpieces/owner/${userId}`),
    getExhibitionArtpieces: (exhibitionId: number) => requests.get<Artpiece[]>(`/artpieces/exhibition/${exhibitionId}`),
    getRoomArtpieces: (roomId: number) => requests.get<Artpiece[]>(`/artpieces/room/${roomId}`),
    getRoomAvailableArtpieces: (exhibitionId: number) => requests.get<Artpiece[]>(`/artpieces/room/${exhibitionId}/available`),
    getArtpiece: (artpieceId: string) => requests.get<Artpiece>(`/artpieces/${artpieceId}`),
    addArtpiece: (artpiece: ArtpieceFormValues) => {
        let formData = new FormData();
        formData.append("Photo", artpiece.photo!);
        formData.append("Name", artpiece.name!);
        formData.append("Description", artpiece.description!);
        formData.append("AuthorName", artpiece.authorName!);
        formData.append("MinTemperature", artpiece.minTemperature.toString());
        formData.append("MaxTemperature", artpiece.maxTemperature.toString());
        formData.append("MinHumidity", artpiece.minHumidity.toString());
        formData.append("MaxHumidity", artpiece.maxHumidity.toString());
        formData.append("MinLight", artpiece.minLight.toString());
        formData.append("MaxLight", artpiece.maxLight.toString());
        return axios.post<Artpiece>("/artpieces", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    updateArtpiece: (artpiece: ArtpieceFormValues) => requests.put<Artpiece>(`/artpieces`, artpiece),
    uploadArtpiecePicture: (artpieceId: string, file: Blob) => {
        let formData = new FormData();
        formData.append("File", file);
        return axios.post<Photo>(`/artpieces/${artpieceId}/picture`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    deleteArtpiece: (artpieceId: string) => requests.del(`/artpieces/${artpieceId}`)
}

const Orders = {
    getExhibitionOrders: (exhibitionId: number) => requests.get<Order[]>(`/orders/exhibition/${exhibitionId}`),
    getOrganiserOrders: (organiserId: string) => requests.get<Order[]>(`/orders/organiser/${organiserId}`),
    getOwnerOrders: (ownerId: string) => requests.get<Order[]>(`/orders/owner/${ownerId}`),
    getDriverOrders: (driverId: string) => requests.get<Order[]>(`/orders/driver/${driverId}`),
    getAvailableOrders: () => requests.get<Order[]>(`/orders/driver`),
    getOrderByArtpiece: (artpieceId: string) => requests.get<Order>(`/orders/artpiece/${artpieceId}/order`),
    getOrder: (orderId: number) => requests.get<Order>(`/orders/${orderId}`),
    addOrder: (order: OrderFormValues) => requests.post<Order>(`/orders`, order),
    setApprovedByOwner: (orderId: number) => requests.put(`/orders/${orderId}/approve`, orderId),
    setAcceptedByDriver: (orderId: number) => requests.put(`/orders/${orderId}/accept`, orderId),
    setInProgress: (orderId: number) => requests.put(`/orders/${orderId}/progress`, orderId),
    setDelivered: (orderId: number) => requests.put(`/orders/${orderId}/deliver`, orderId),
    setDeclined: (orderId: number) => requests.put(`/orders/${orderId}/decline`, orderId),
    setCanceled: (orderId: number) => requests.put(`/orders/${orderId}/cancel`, orderId),
    setReturned: (orderId: number) => requests.put(`/orders/${orderId}/return`, orderId)
}

const Rooms = {
    getExhibitionRooms: (exhibitionId: number) => requests.get<Room[]>(`/rooms/exhibition/${exhibitionId}`),
    getRoom: (roomId: number) => requests.get<Room>(`/rooms/${roomId}`),
    addRoom: (room: Partial<Room>) => requests.post<Room>(`/rooms`, room),
    deleteRoom: (roomId: number) => requests.del(`/rooms/${roomId}`),
    addArtpieceToRoom: (roomId: number, artpieceId: string) => requests.post(`/rooms/${roomId}/${artpieceId}`, roomId),
    deleteArtpieceFromRoom: (roomId: number, artpieceId: string) => requests.del(`/rooms/${roomId}/${artpieceId}`)
}

const agent = {
    Account,
    Profiles,
    Exhibitions,
    Artpieces, 
    Orders,
    Rooms
};

export default agent;