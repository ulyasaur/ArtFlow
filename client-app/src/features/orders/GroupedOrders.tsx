import { Box, Divider, ThemeProvider, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { useStore } from "../../app/stores/store";
import { DeliveryStatus } from "../../app/models/status";
import OrderCard from "./OrderCard";

export default observer(function GroupedOrders() {
    const { t } = useTranslation();
    const { orderStore } = useStore();
    const { groupedOrders } = orderStore;

    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));

    return (
        <ThemeProvider theme={theme}>
            {
                groupedOrders.map(([status, orders]) => (
                    <Box key={status}>
                        <Div sx={{ color: "hotpink" }}>{t(`status.${DeliveryStatus[parseInt(status)].toString()}`)}</Div>
                        {
                            orders.map(order =>
                                <Box key={order.orderId}>
                                    <OrderCard order={order} />
                                    <Divider variant="middle" />
                                </Box>)
                        }
                    </Box>
                ))
            }
        </ThemeProvider>
    );
})