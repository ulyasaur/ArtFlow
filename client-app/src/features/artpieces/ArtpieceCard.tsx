import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { router } from "../../app/router/router";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Artpiece } from "../../app/models/artpiece";
import placeholder from "../../assets/placeholder.png";

interface Props {
    artpiece: Artpiece;
}

export default observer(function ArtpieceCard({ artpiece }: Props) {
    const { t } = useTranslation();
    const { artpieceStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { deleteArtpiece } = artpieceStore;

    return (
        <ThemeProvider theme={theme}>
            <ListItem
                secondaryAction={
                    artpiece.owner.id === currentUser?.id
                        ? <IconButton
                            onClick={() => deleteArtpiece(artpiece.artpieceId)}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                        : null
                }
            >
                <ListItemAvatar
                    onClick={() => router.navigate(`/artpiece/${artpiece.artpieceId}`)}
                    sx={{ paddingRight: "20px" }}
                >
                    <Avatar
                        alt={artpiece.name}
                        src={artpiece.photo ? artpiece.photo.url : placeholder}
                        sx={{ width: 80, height: 80 }}
                    />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/artpiece/${artpiece.artpieceId}`)}
                    primary={artpiece.name}
                    secondary={artpiece.authorName}
                />
            </ListItem>
        </ThemeProvider>
    );
})
