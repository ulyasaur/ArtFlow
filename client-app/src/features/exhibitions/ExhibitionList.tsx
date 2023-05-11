import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Avatar, Card, CardHeader, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, ThemeProvider, Tooltip } from "@mui/material";
import { router } from "../../app/router/router";
import FestivalIcon from '@mui/icons-material/Festival';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import formatDate from "../../app/formatting/formatDate";

export default observer(function ExhibitionList() {
    const { t } = useTranslation();
    const { exhibitionStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { loading, exhibitions, loadExhibitions, deleteExhibition } = exhibitionStore;

    useEffect(() => {
        loadExhibitions(currentUser!.id);
    }, [currentUser!.id, loadExhibitions]);

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
                            <ListItem
                                key={exhibition.exhibitionId}
                                secondaryAction={
                                    <IconButton onClick={() => deleteExhibition(exhibition.exhibitionId)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>                                    
                                }
                            >
                                <ListItemAvatar
                                onClick={() => router.navigate(`/exhibition/${exhibition.exhibitionId}`)}
                                >
                                    <Avatar>
                                        <FestivalIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    onClick={() => router.navigate(`/exhibition/${exhibition.exhibitionId}`)}
                                    primary={exhibition.name}
                                    secondary={
                                        <>
                                            <CalendarMonthIcon fontSize="inherit" />
                                            {
                                                formatDate(exhibition.startDate.toString()) === formatDate(exhibition.endDate.toString())
                                                    ? ` ${formatDate(exhibition.startDate.toString())}`
                                                    : ` ${formatDate(exhibition.startDate.toString())} - ${formatDate(exhibition.endDate.toString())}`
                                            }
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="middle" />
                        </>)
                }
            </Card>
        </ThemeProvider>
    );
})
