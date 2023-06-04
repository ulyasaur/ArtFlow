import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Order, OrderFormValues } from "../models/order";
import { DeliveryStatus } from "../models/status";
import { State } from "../models/state";

export default class OrderStore {
    orders: Order[] | null = null;
    order: Order | null = null;
    states: State[] | null = null;
    loading = false;
    loadingStatus = false;

    constructor() {
        makeAutoObservable(this);
    }

    get groupedOrders() {
        return Object.entries(
            this.orders!.reduce((orders, order) => {
                const status = order.status;
                orders[status] = orders[status] ? [...orders[status], order] : [order];
                return orders;
            }, {} as { [key: string]: Order[] })
        );
    }

    loadOrderStates = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            const states = await agent.States.getOrderStates(orderId);
            runInAction(() => {
                this.states = states;
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
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

    setApprovedByOwner = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setApprovedByOwner(orderId);
            this.setStatus(orderId, DeliveryStatus.ApprovedByOwner);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setAcceptedByDriver = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setAcceptedByDriver(orderId);
            this.setStatus(orderId, DeliveryStatus.ApprovedByDriver);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setInProgress = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setInProgress(orderId);
            this.setStatus(orderId, DeliveryStatus.InProgress);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setDelivered = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setDelivered(orderId);
            this.setStatus(orderId, DeliveryStatus.Delivered);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setDeclined = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setDeclined(orderId);
            this.setStatus(orderId, DeliveryStatus.Declined);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setCanceled = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setCanceled(orderId);
            this.setStatus(orderId, DeliveryStatus.Canceled);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setReturned = async (orderId: number) => {
        this.loadingStatus = true;
        try {
            await agent.Orders.setReturned(orderId);
            this.setStatus(orderId, DeliveryStatus.Returned);
            runInAction(() => {
                this.loadingStatus = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingStatus = false);
        }
    }

    setStatus = (orderId: number, status: number) => {
        try {
            runInAction(() => {
                if (this.order?.orderId === orderId) {
                    this.order.status = status
                }

                this.orders?.forEach(order => {
                    if (order.orderId === orderId) {
                        order.status = status
                    }
                });
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}