import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../app/themes/theme";
import OrderHeader from "./OrderHeader";
import { Card, CardHeader } from "@mui/material";

export default observer(function OrderPage() {
    const { t } = useTranslation();

    const { orderId } = useParams<string>();
    const { orderStore } = useStore();
    const { order, loadOrder, loading } = orderStore;

    useEffect(() => {
        loadOrder(parseInt(orderId!))
    }, [loadOrder, orderId]);

    if (loading || !order) {
        return <LoadingComponent content={t("loading.order").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw",
                    minHeight: "89vh"
                }}
            >
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title={t("order.order")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <OrderHeader order={order} />
            </Card>            
        </ThemeProvider>
    );
})