import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Order, OrderFormValues } from "../models/order";

export default class OrderStore {
    orders: Order[] | null = null;
    order: Order | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadExhibitionOrders = async (exhibitionId: number) => {
        this.loading = true;
        try {
            const orders = await agent.Orders.getExhibitionOrders(exhibitionId);
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadOrganiserOrders = async (userId: string) => {
        this.loading = true;
        try {
            const orders = await agent.Orders.getOrganiserOrders(userId);
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadOwnerOrders = async (userId: string) => {
        this.loading = true;
        try {
            const orders = await agent.Orders.getOwnerOrders(userId);
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadDriverOrders = async (userId: string) => {
        this.loading = true;
        try {
            const orders = await agent.Orders.getDriverOrders(userId);
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadAvailableOrders = async () => {
        this.loading = true;
        try {
            const orders = await agent.Orders.getAvailableOrders();
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadOrder = async (orderId: number) => {
        this.loading = true;
        try {
            const order = await agent.Orders.getOrder(orderId);
            runInAction(() => {
                this.order = order;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    addOrder = async (order: OrderFormValues) => {
        this.loading = true;
        try {
            const added = await agent.Orders.addOrder(order);
            runInAction(() => {
                this.order = added;
                this.orders?.push(added);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}