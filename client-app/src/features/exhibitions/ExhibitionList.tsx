import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardHeader, Divider, IconButton, ThemeProvider, Tooltip } from "@mui/material";
import { router } from "../../app/router/router";
import AddIcon from '@mui/icons-material/Add';
import ExhibitionCard from "./ExhibitionCard";

export default observer(function ExhibitionList() {
    const { t } = useTranslation();
    const { exhibitionStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { loading, exhibitions, loadExhibitions } = exhibitionStore;

    useEffect(() => {
        loadExhibitions(currentUser!.id);
    }, [currentUser, loadExhibitions]);

    if (loading || !exhibitions) {
        return <LoadingComponent content={t("loading.exhibitions").toString()} />
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
                    title={t("navbar.exhibitions")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                    action={
                        <Tooltip title={t("exhibition.add")} >
                            <IconButton onClick={() => router.navigate("/exhibitions/add")}>
                                <AddIcon fontSize="large" sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    }
                />

                {
                    exhibitions.map(exhibition =>
                        <>
                            <ExhibitionCard exhibition={exhibition} actions={true} />
                            <Divider variant="middle" />
                        </>)
                }
            </Card>
        </ThemeProvider>
    );
})
