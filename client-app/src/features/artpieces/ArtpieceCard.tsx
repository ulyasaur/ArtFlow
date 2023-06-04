import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { router } from "../../app/router/router";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Artpiece } from "../../app/models/artpiece";
import placeholder from "../../assets/placeholder.png";

interface Props {
    artpiece: Artpiece;
    actions?: boolean;
}

export default observer(function ArtpieceCard({ artpiece, actions }: Props) {
    const { t } = useTranslation();
    const { artpieceStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { deleteArtpiece } = artpieceStore;

    return (
        <ThemeProvider theme={theme}>
            <ListItem
                secondaryAction={
                    actions
                        ? artpiece.owner.id === currentUser?.id
                            ? <IconButton
                                onClick={() => deleteArtpiece(artpiece.artpieceId)}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                            : currentUser?.role === "Organiser"
                                ? <Button onClick={() => router.navigate(`/${artpiece.artpieceId}/order`)}>{t("order.make")}</Button>
                                : null
                        : null
                }
            >
                <ListItemAvatar
                    onClick={() => router.navigate(`/artpieces/${artpiece.artpieceId}`)}
                    sx={{ paddingRight: "20px" }}
                >
                    <Avatar
                        alt={artpiece.name}
                        src={artpiece.photo ? artpiece.photo.url : placeholder}
                        sx={{ width: 80, height: 80 }}
                    />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/artpieces/${artpiece.artpieceId}`)}
                    primary={artpiece.name}
                    secondary={artpiece.authorName}
                />
            </ListItem>
        </ThemeProvider >
    );
})
