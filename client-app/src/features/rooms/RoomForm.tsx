import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Box, Card, CardContent, CardHeader, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import ExhibitionCard from "../exhibitions/ExhibitionCard";

export default observer(function RoomForm() {
    const { t } = useTranslation();
    const { exhibitionStore, roomStore } = useStore();
    const { loadExhibition, exhibition, loading } = exhibitionStore;
    const { addRoom } = roomStore;
    const { exhibitionId } = useParams<string>();

    useEffect(() => {
        if (exhibitionId) {
            loadExhibition(exhibitionId);
        }
    }, [exhibitionId, loadExhibition]);

    if (loading || !exhibition || !exhibitionId) {
        return <LoadingComponent content={t("loading.room").toString()} />
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
                    title={t("room.room")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <Box sx={{ paddingBottom: "20px" }}>
                        <Typography sx={{ paddingLeft: "20px", paddingBottom: "10px" }} color="textSecondary">
                            {t("exhibition.exhibition")}
                        </Typography>
                        <Paper>
                            <ExhibitionCard exhibition={exhibition} />
                        </Paper>
                    </Box>

                    <Formik
                        initialValues={{
                            name: "",
                            exhibitionId: parseInt(exhibitionId),
                            maxNumberOfPieces: 0,
                            error: null
                        }}
                        onSubmit={(values, { setErrors }) => addRoom(values).catch(() =>
                            setErrors({ error: "Invalid input" }))
                        }
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label={t("room.name").toString()}
                                            placeholder={t("room.name").toString()}
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("room.limit").toString()}
                                            placeholder={t("room.limit").toString()}
                                            name="maxNumberOfPieces"
                                            InputProps={{ min: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ErrorMessage
                                            name="error"
                                            render={() =>
                                                <Typography color="error">
                                                    {errors.error}
                                                </Typography>}
                                        />
                                    </Grid>
                                </Grid>
                                <LoadingButton
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {t("actions.save")}
                                </LoadingButton>
                            </form>)}
                    </Formik>

                </CardContent>
            </Card>
        </ThemeProvider>
    );
})
