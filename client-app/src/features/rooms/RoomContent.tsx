import React from "react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider, Tooltip } from "@mui/material";
import { theme } from "../../app/themes/theme";
import { Artpiece } from "../../app/models/artpiece";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import placeholder from "../../assets/placeholder.png";
import AvailableArtpiecesWidget from "../artpieces/AvailableArtpiecesWidget";

interface Props {
    roomId: number;
    exhibitionId: number;
    artpieces: Artpiece[];
}

export default observer(function RoomContent({ roomId, exhibitionId, artpieces }: Props) {
    const { t } = useTranslation();
    const { roomStore } = useStore();
    const { deleteArtpieceFromRoom } = roomStore;

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw",
                    minHeight: "23vh"
                }}
            >
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title={t("navbar.artpieces")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                    action={
                        <Tooltip title={t("artpiece.add")} >
                            <IconButton
                                onClick={() => setOpenDialog(true)}>
                                <AddIcon fontSize="large" sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <CardContent>
                    {
                        artpieces.map(artpiece => (
                            <>
                                <ListItem
                                    key={artpiece.artpieceId}
                                    secondaryAction={
                                        <IconButton
                                            onClick={() => {
                                                deleteArtpieceFromRoom(roomId, artpiece.artpieceId);
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar
                                        sx={{ paddingRight: "20px" }}
                                    >
                                        <Avatar
                                            alt={artpiece.name}
                                            src={artpiece.photo ? artpiece.photo.url : placeholder}
                                            sx={{ width: 80, height: 80 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={artpiece.name}
                                        secondary={artpiece.authorName}
                                    />
                                </ListItem>
                                <Divider variant="middle" />
                            </>
                        ))
                    }
                </CardContent>
            </Card>

            <AvailableArtpiecesWidget
                open={openDialog}
                handleClose={setOpenDialog}
                exhibitionId={exhibitionId}
                roomId={roomId}
            />
        </ThemeProvider>
    );
})