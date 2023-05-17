import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, IconButton, Menu, MenuItem, ThemeProvider } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { router } from "../../app/router/router";
import { theme } from "../../app/themes/theme";
import RoomHeader from "./RoomHeader";
import RoomContent from "./RoomContent";

export default observer(function RoomPage() {
    const { t } = useTranslation();

    const { exhibitionId, roomId } = useParams<string>();
    const { exhibitionStore, roomStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { loadExhibition, exhibition, loading: loadingEx } = exhibitionStore;
    const { loadRoom, loadRoomArtpieces, room, artpieces, deleteRoom, loading } = roomStore;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        loadExhibition(exhibitionId!);
        loadRoom(parseInt(roomId!));
        loadRoomArtpieces(parseInt(roomId!))
    }, [exhibitionId, roomId, loadRoom, loadRoomArtpieces, loadExhibition]);

    if (loading || !room || !exhibition || loadingEx || !artpieces) {
        return <LoadingComponent content={t("loading.room").toString()} />
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
                    title={t("room.room")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                    action={
                        (currentUser?.id === exhibition.organiserId)
                            ? <>
                                <IconButton
                                    onClick={handleOpen}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        deleteRoom(room.roomId);
                                        router.navigate(`/exhibitions/${room.exhibitionId}`);
                                    }}>{t("actions.delete")}</MenuItem>
                                </Menu>
                            </>
                            : <></>
                    }
                />
                <RoomHeader room={room} exhibition={exhibition} />
                <RoomContent roomId={room.roomId} exhibitionId={exhibition.exhibitionId} artpieces={artpieces} />
            </Card>
        </ThemeProvider>
    );
})