import { Button, Grid, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { theme } from "../../app/themes/theme";
import { Order } from "../../app/models/order";
import { DeliveryStatus } from "../../app/models/status";
import { useTranslation } from "react-i18next";

interface Props {
    order: Order;
}

export default observer(function OrderActionButton({ order }: Props) {
    const { t } = useTranslation()
    const { userStore, orderStore } = useStore();
    const { currentUser } = userStore;
    const {
        setApprovedByOwner,
        setAcceptedByDriver,
        setInProgress,
        setDelivered,
        setDeclined,
        setCanceled,
        setReturned,
        loadingStatus
    } = orderStore;

    if (DeliveryStatus[order.status].toString() === "Declined" 
            || DeliveryStatus[order.status].toString() === "Canceled" 
            || DeliveryStatus[order.status].toString() === "Returned") {
        return null;
    }

    if (order.seller.id === currentUser!.id) {
        if (DeliveryStatus[order.status].toString() === "Registered") {
            return (
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid xs={5.75}>
                            <Button
                                sx={{
                                    width: "100%"
                                }}
                                variant="contained"
                                onClick={() => setApprovedByOwner(order.orderId)}
                            >
                                {t("order.action.approve")}
                            </Button>
                        </Grid>
                        <Grid xs={0.5} />
                        <Grid xs={5.75}>
                            <Button
                                sx={{
                                    width: "100%"
                                }}
                                color="error"
                                variant="outlined"
                                onClick={() => setDeclined(order.orderId)}
                            >
                                {t("order.action.decline")}
                            </Button>

                        </Grid>
                    </Grid>
                </ThemeProvider>
            );
        }
    } else if (order.customer.id === currentUser!.id) {
        if (DeliveryStatus[order.status].toString() === "Delivered") {
            return (
                <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                            width: "100%"
                        }}
                        variant="contained"
                        onClick={() => setReturned(order.orderId)}
                    >
                        {t("order.action.return")}
                    </Button>
                </ThemeProvider>
            );
        } else {
            return (
                <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                            width: "100%"
                        }}
                        color="error"
                        variant="outlined"
                        onClick={() => setCanceled(order.orderId)}
                    >
                        {t("order.action.cancel")}
                    </Button>
                </ThemeProvider>
            );
        }
    } else if (order.driver?.id === currentUser!.id) {
        if (DeliveryStatus[order.status].toString() === "ApprovedByDriver") {
            return (
                <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                            width: "100%"
                        }}
                        variant="contained"
                        onClick={() => setInProgress(order.orderId)}
                    >
                        {t("order.action.inProgress")}
                    </Button>
                </ThemeProvider>
            );
        } else if (DeliveryStatus[order.status].toString() === "InProgress") {
            return (
                <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                            width: "100%"
                        }}
                        variant="contained"
                        onClick={() => setDelivered(order.orderId)}
                    >
                        {t("order.action.deliver")}
                    </Button>
                </ThemeProvider>
            );
        }
    } else if (currentUser?.role === "Driver" && DeliveryStatus[order.status].toString() === "ApprovedByOwner") {
        return (
            <ThemeProvider theme={theme}>
                <Button
                    sx={{
                        width: "100%"
                    }}
                    variant="contained"
                    onClick={() => setAcceptedByDriver(order.orderId)}
                >
                    {t("order.action.accept")}
                </Button>
            </ThemeProvider>
        );
    }

    return null;
})