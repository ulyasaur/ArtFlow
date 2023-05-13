import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function UserOrdersList() {
    const { t } = useTranslation();
    const { orderStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { orders, loadDriverOrders, loadOrganiserOrders, loadOwnerOrders, loading } = orderStore;

    useEffect(() => {
        if (currentUser?.role === "ArtOwner") {
            loadOwnerOrders(currentUser.id);
        } else if (currentUser?.role === "Driver") {
            loadDriverOrders(currentUser.id);
        } else if (currentUser?.role === "Organiser") {
            loadOrganiserOrders(currentUser.id);
        }
    }, [currentUser, loadDriverOrders, loadOrganiserOrders, loadOwnerOrders]);

    if (loading || !orders) {
        return <LoadingComponent content={t("loading.orders").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minHeight: "89vh"
                }}
            >
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title={t("navbar.orders")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    {orders?.map(order =>
                        <Box key={order.orderId}>
                            <OrderCard order={order} />
                            <Divider variant="middle" />
                        </Box>)}
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})