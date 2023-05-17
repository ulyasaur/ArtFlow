import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import ExhibitionHeader from "./ExhibitionHeader";
import { Box, Card, CardHeader, IconButton, Menu, MenuItem, Tab, Tabs, ThemeProvider } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { router } from "../../app/router/router";
import { theme } from "../../app/themes/theme";
import { TabContext, TabPanel } from "@mui/lab";
import ExhibitionOrders from "./ExhibitionOrders";
import ExhibitionArtpieces from "./ExhibitionArtpieces";
import RoomList from "../rooms/RoomList";

export default observer(function ExhibitionPage() {
    const { t } = useTranslation();

    const { exhibitionId } = useParams<string>();
    const { exhibitionStore, userStore } = useStore();
    const { loadExhibition, exhibition, loading, deleteExhibition } = exhibitionStore;
    const { currentUser } = userStore;

    const [value, setValue] = useState("rooms");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
    }, [exhibitionId, loadExhibition]);

    if (loading || !exhibition) {
        return <LoadingComponent content={t("loading.exhibition").toString()} />
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
                    title={t("exhibition.exhibition")}
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
                                        router.navigate(`/exhibitions/update/${exhibition.exhibitionId}`)
                                    }}>{t("actions.edit")}</MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        deleteExhibition(exhibition.exhibitionId)
                                    }}>{t("actions.delete")}</MenuItem>
                                </Menu>
                            </>
                            : <></>
                    }
                />
                <ExhibitionHeader exhibition={exhibition} />
                {
                    currentUser?.id === exhibition.organiserId &&
                    <TabContext value={value}>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab
                                    // icon={} iconPosition="start" 
                                    label={t("room.rooms")} value="rooms" />
                                <Tab
                                    // icon={} iconPosition="start" 
                                    label={t("order.order")} value="orders" />
                                <Tab
                                    // icon={} iconPosition="start" 
                                    label={t("navbar.artpieces")} value="artpieces" />
                            </Tabs>
                        </Box>
                        <TabPanel value='rooms'>
                            <RoomList exhibition={exhibition} />
                        </TabPanel>
                        <TabPanel value='orders'>
                            <ExhibitionOrders exhibitionId={exhibition.exhibitionId} />
                        </TabPanel>
                        <TabPanel value='artpieces'>
                            <ExhibitionArtpieces exhibitionId={exhibition.exhibitionId} />
                        </TabPanel>
                    </TabContext>
                }

            </Card>
        </ThemeProvider>
    );
})