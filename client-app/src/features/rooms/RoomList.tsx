import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/themes/theme";
import { useStore } from "../../app/stores/store";
import { Avatar, Button, Card, CardHeader, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Exhibition } from "../../app/models/exhibition";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { router } from "../../app/router/router";
import PaletteIcon from '@mui/icons-material/Palette';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    exhibition: Exhibition;
}

export default observer(function RoomList({ exhibition }: Props) {
    const { t } = useTranslation();
    const { roomStore, userStore } = useStore();
    const { currentUser } = userStore;
    const {
        loading,
        loadRooms,
        deleteRoom,
        rooms
    } = roomStore;

    useEffect(() => {
        loadRooms(exhibition.exhibitionId);
    }, [exhibition, loadRooms]);

    if (loading || !rooms) {
        return <LoadingComponent content={t("loading.rooms").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ minHeight: "28vh" }}>
                <CardHeader
                    action={
                        currentUser?.id === exhibition.organiserId &&
                        <Button
                            variant="contained"
                            onClick={() => router.navigate(`/exhibitions/${exhibition.exhibitionId}/room/add`)}
                        >
                            {t("room.add")}
                        </Button>
                    }
                />
                {
                    rooms.map(room => (
                        <>
                            <ListItem
                                key={room.roomId}
                                secondaryAction={
                                    <IconButton onClick={() => deleteRoom(room.roomId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar
                                    onClick={() => router.navigate(`/exhibitions/${exhibition.exhibitionId}/room/${room.roomId}`)}
                                >
                                    <Avatar>
                                        <PaletteIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    onClick={() => router.navigate(`/exhibitions/${exhibition.exhibitionId}/room/${room.roomId}`)}
                                    primary={`${t("room.room")} "${room.name}"`}
                                    secondary={`${t("room.artpieces")}: ${room.numberOfPieces}/${room.maxNumberOfPieces}`}
                                />
                            </ListItem>
                            <Divider variant="middle" />
                        </>
                    ))
                }
            </Card>
        </ThemeProvider>
    );
})