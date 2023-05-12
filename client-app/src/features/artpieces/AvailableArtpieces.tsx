import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardHeader, Divider, IconButton, ThemeProvider, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArtpieceCard from "./ArtpieceCard";
import { router } from "../../app/router/router";

export default observer(function AvailableArtpieces() {
    const { t } = useTranslation();
    const { artpieceStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { loading, artpieces, loadAvailableArtpieces } = artpieceStore;

    useEffect(() => {
        loadAvailableArtpieces();
    }, [currentUser!.id, loadAvailableArtpieces]);

    if (loading || !artpieces) {
        return <LoadingComponent content={t("loading.artpieces").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minHeight: "89vh"
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
                />

                {
                    artpieces.map(artpiece =>
                        <> <ArtpieceCard
                            key={artpiece.artpieceId}
                            artpiece={artpiece}
                        />
                            <Divider variant="middle" />
                        </>
                    )
                }
            </Card>
        </ThemeProvider>
    );
})
