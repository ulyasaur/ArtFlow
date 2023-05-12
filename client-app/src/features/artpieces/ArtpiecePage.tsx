import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardHeader, IconButton, Menu, MenuItem, ThemeProvider } from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArtpieceHeader from "./ArtpieceHeader";
import { router } from "../../app/router/router";

export default observer(function ArtpiecePage() {
    const { t } = useTranslation();
    const { artpieceId } = useParams<string>();
    const { artpieceStore, userStore } = useStore();
    const { artpiece, loadArtpiece, loading, deleteArtpiece } = artpieceStore;
    const { currentUser } = userStore; const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        loadArtpiece(artpieceId!);
    }, [artpieceId, loadArtpiece]);

    if (loading || !artpiece) {
        return <LoadingComponent content={t("loading.artpiece").toString()} />
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
                    title={t("artpiece.artpiece")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                    action={
                        (currentUser?.id === artpiece.ownerId)
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
                                        router.navigate(`/artpieces/update/${artpiece.artpieceId}`)
                                    }}>{t("actions.edit")}</MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        deleteArtpiece(artpiece.artpieceId)
                                    }}>{t("actions.delete")}</MenuItem>
                                </Menu>
                            </>
                            : <></>
                    }
                />
                <ArtpieceHeader artpiece={artpiece} />
            </Card>
        </ThemeProvider>
    );
})
