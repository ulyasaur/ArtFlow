import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardContent } from "@mui/material";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import GroupedOrders from "../orders/GroupedOrders";

interface Props {
    exhibitionId: number;
}

export default observer(function ExhibitionOrders({ exhibitionId }: Props) {
    const { t } = useTranslation();
    const { orderStore } = useStore();
    const { orders, loadExhibitionOrders, loading } = orderStore;

    useEffect(() => {
        loadExhibitionOrders(exhibitionId);
    }, [exhibitionId, loadExhibitionOrders]);

    if (loading || !orders) {
        return <LoadingComponent content={t("loading.orders").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{minHeight: "28vh"}}>
                <CardContent>
                    <GroupedOrders/>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})