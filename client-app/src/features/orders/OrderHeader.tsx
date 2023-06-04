import { Box, Card, CardContent, CardMedia, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Order } from "../../app/models/order";
import UserCard from "../users/UserCard";
import backgroundPic from "../../assets/backgroud-picture.jpg";
import ArtpieceCard from "../artpieces/ArtpieceCard";
import ExhibitionCard from "../exhibitions/ExhibitionCard";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DeliveryStatus } from "../../app/models/status";
import OrderActionButton from "./OrderActionButton";

interface Props {
    order: Order;
}

export default observer(function OrderHeader({ order }: Props) {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <CardContent>
                <Grid
                    container
                >
                    <Grid
                        xs={8}
                    >
                        <Card>
                            <CardMedia
                                sx={{ height: 150 }}
                                image={backgroundPic}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="h5" component="h2">
                                    {`${t("order.order")} №${order.orderId}`}
                                </Typography>

                                <Typography color="textSecondary" variant="h6" component="p">
                                    <LocationOnIcon fontSize="inherit" />
                                    {order.adress}
                                </Typography>

                                <Typography color="textSecondary" variant="h6" component="p">
                                    {`${t("status.status")}: ${t(`status.${DeliveryStatus[order.status].toString()}`)}`}
                                </Typography>

                                {/* {exhibition.description
                                    ? <Typography color="textSecondary" variant="h6" component="p">
                                        {exhibition.description}
                                    </Typography>
                                    : <Typography color="textSecondary" variant="h6" component="p">
                                        {t("exhibition.description")}
                                    </Typography>} */}
                                    
                                <Box sx={{ paddingTop: "20px"}}>
                                    <Typography sx={{ paddingLeft: "20px", paddingBottom:"10px" }} color="textSecondary">
                                        {t("artpiece.artpiece")}
                                    </Typography>
                                    <Paper>
                                        <ArtpieceCard artpiece={order.artpiece} />
                                    </Paper>                                    
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        xs={4}
                    >
                        <UserCard user={order.customer} description={t("roles.Organiser")} />
                        <UserCard user={order.seller} description={t("roles.ArtOwner")} />
                        {order.driver ? <UserCard user={order.driver!} description={t("roles.Driver")} /> : null}                        
                        <Typography sx={{ paddingLeft: "20px" }} color="textSecondary">
                            {t("exhibition.exhibition")}
                        </Typography>
                        <ExhibitionCard exhibition={order.exhibition} />
                        <Box sx={{ paddingLeft: "20px" }}>
                            <OrderActionButton order={order} />
                        </Box>                        
                    </Grid>
                </Grid>
            </CardContent>
        </ThemeProvider>
    );
})