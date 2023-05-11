import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";
import ExhibitionHeader from "./ExhibitionHeader";
import { Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { router } from "../../app/router/router";

export default observer(function ExhibitionPage() {
    const { t } = useTranslation();
    
    const { exhibitionId } = useParams<string>();
    const { exhibitionStore, userStore } = useStore();
    const { loadExhibition, exhibition, loading, deleteExhibition } = exhibitionStore;
    const {currentUser} = userStore;

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
    
    if (loading) {
        return <LoadingComponent content={t("loading.exhibition").toString()} />
    }

    return (
        <>
            {exhibition && 
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
            </Card>
            }
        </>
    );
})