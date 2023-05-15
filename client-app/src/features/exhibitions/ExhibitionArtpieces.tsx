import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Box, Card, CardContent, Divider, ThemeProvider } from "@mui/material";
import ArtpieceCard from "../artpieces/ArtpieceCard";

interface Props {
    exhibitionId: number;
}

export default observer(function ExhibitionArtpieces({ exhibitionId }: Props) {
    const { t } = useTranslation();
    const { artpieceStore } = useStore();
    const { loading, artpieces, loadExhibitionArtpieces } = artpieceStore;

    useEffect(() => {
        loadExhibitionArtpieces(exhibitionId);
    }, [exhibitionId, loadExhibitionArtpieces]);

    if (loading || !artpieces) {
        return <LoadingComponent content={t("loading.artpieces").toString()} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{minHeight: "28vh"}}>
                <CardContent>
                    {
                        artpieces.map(artpiece =>
                            <Box key={artpiece.artpieceId}>
                                <ArtpieceCard
                                    artpiece={artpiece}
                                />
                                <Divider variant="middle" />
                            </Box>
                        )
                    }
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})
