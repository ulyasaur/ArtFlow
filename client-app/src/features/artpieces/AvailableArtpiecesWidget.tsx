import { Avatar, Card, CardContent, CardHeader, Dialog, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../app/stores/store";
import AddIcon from '@mui/icons-material/Add';
import placeholder from "../../assets/placeholder.png";
import { theme } from "../../app/themes/theme";

interface Props {
    exhibitionId: number;
    roomId: number;
    open: boolean;
    handleClose: (open: boolean) => void;
}

export default observer(function AvailableArtpiecesWidget({ exhibitionId, roomId, open, handleClose }: Props) {
    const { t } = useTranslation();
    const { artpieceStore, roomStore } = useStore();
    const { loading, artpieces, loadAvailableRoomArtpieces } = artpieceStore;
    const { addArtpieceToRoom } = roomStore;

    useEffect(() => {
        loadAvailableRoomArtpieces(exhibitionId);
    }, [exhibitionId, loadAvailableRoomArtpieces])

    if (loading || !artpieces) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                fullWidth
                open={open}
                onClose={() => {
                    handleClose(false);
                }} >
                <Card
                sx={{
                    minHeight: "50vh"
                }}>
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
                                                    addArtpieceToRoom(roomId, artpiece.artpieceId);
                                                    handleClose(false);
                                                }}
                                            >
                                                <AddIcon />
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
                                    <Divider variant="middle"/>
                                </>
                            ))
                        }
                    </CardContent>
                </Card>
            </Dialog>

        </ThemeProvider>
    );
}) 