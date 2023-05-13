import { Avatar, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Order } from "../../app/models/order";
import placeholder from "../../assets/placeholder.png";
import { router } from "../../app/router/router";

interface Props {
    order: Order;
}

export default observer(function OrderCard({ order }: Props) {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <ListItem
            // secondaryAction={
            //     artpiece.owner.id === currentUser?.id
            //         ? <IconButton
            //             onClick={() => deleteArtpiece(artpiece.artpieceId)}
            //         >
            //             <DeleteOutlineIcon />
            //         </IconButton>
            //         : null
            // }
            >
                <ListItemAvatar
                    onClick={() => router.navigate(`/orders/${order.orderId}`)}
                    sx={{ paddingRight: "20px" }}
                >
                    <Avatar
                        alt={order.artpiece.name}
                        src={order.artpiece.photo ? order.artpiece.photo.url : placeholder}
                        sx={{ width: 60, height: 60 }}
                    />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/orders/${order.orderId}`)}
                    primary={`${t("order.order")} №${order.orderId}`}
                    //secondary={artpiece.authorName}
                />
            </ListItem>
        </ThemeProvider>
    );
})