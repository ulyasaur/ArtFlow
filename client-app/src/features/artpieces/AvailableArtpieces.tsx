import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Box, Card, CardHeader, Divider, ThemeProvider } from "@mui/material";
import ArtpieceCard from "./ArtpieceCard";

export default observer(function AvailableArtpieces() {
    const { t } = useTranslation();
    const { artpieceStore } = useStore();
    const { loading, artpieces, loadAvailableArtpieces } = artpieceStore;

    useEffect(() => {
        loadAvailableArtpieces();
    }, [loadAvailableArtpieces]);

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
                        <Box key={artpiece.artpieceId}>
                            <ArtpieceCard
                                artpiece={artpiece}
                                actions={true}
                            />
                            <Divider variant="middle" />
                        </Box>
                    )
                }
            </Card>
        </ThemeProvider>
    );
})
