import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Box, Card, CardContent, CardMedia, Paper, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../app/themes/theme";
import { Room } from "../../app/models/room";
import { Exhibition } from "../../app/models/exhibition";
import backgroundPic from "../../assets/backgroud-picture.jpg";
import ExhibitionCard from "../exhibitions/ExhibitionCard";

interface Props {
    room: Room;
    exhibition: Exhibition;
}

export default observer(function RoomHeader({ room, exhibition }: Props) {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <CardContent>
                <Card>
                    <CardMedia
                        sx={{ height: 150 }}
                        image={backgroundPic}
                    />
                    <CardContent>
                        <Typography
                            fontWeight={"bold"}
                            variant="h5" component="h2">
                            {`${t("room.room")} "${room.name}"`}
                        </Typography>

                        <Typography color="textSecondary" variant="h6" component="p">
                            {`${t("room.artpieces")}: ${room.numberOfPieces}/${room.maxNumberOfPieces}`}
                        </Typography>

                        <Box sx={{ paddingTop: "20px" }}>
                            <Typography sx={{ paddingLeft: "20px", paddingBottom: "10px" }} color="textSecondary">
                                {t("exhibition.exhibition")}
                            </Typography>
                            <Paper>
                                <ExhibitionCard exhibition={exhibition} />
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
            </CardContent>
        </ThemeProvider>
    );
})