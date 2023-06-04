import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, InputAdornment, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { ArtpieceFormValues } from "../../app/models/artpiece";
import LoadingComponent from "../../app/layout/LoadingComponent";
import placeholder from "../../assets/placeholder.png";
import PhotoUploadWidget from "../../app/common/photo/PhotoUploadWidget";
import { PhotoCamera } from "@mui/icons-material";
import fahrenheitToCelsius from "../../app/formatting/temperature/fahrenheitToCelsius";
import celsiusToFahrenheit from "../../app/formatting/temperature/celsiusToFahrenheit";

export default observer(function ArtpieceUpdateForm() {
    const { t } = useTranslation();
    const { artpieceId } = useParams<string>();
    const { artpieceStore } = useStore();
    const { artpiece, loadArtpiece, loading, updateArtpiece, uploadArtpiecePicture, tempUnit } = artpieceStore;
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);

    const [editingArtpiece, setEditingArtpiece] = useState<ArtpieceFormValues>(new ArtpieceFormValues());

    const handleFormSubmit = async (values: any) => {
        editingArtpiece.name = values.name;
        editingArtpiece.description = values.description;
        editingArtpiece.authorName = values.authorName;
        if (tempUnit === "f") {
            editingArtpiece.minTemperature = fahrenheitToCelsius(parseFloat(values.minTemperature));
            editingArtpiece.maxTemperature = fahrenheitToCelsius(parseFloat(values.maxTemperature));
        } else {
            editingArtpiece.minTemperature = values.minTemperature;
            editingArtpiece.maxTemperature = values.maxTemperature;
        }
        editingArtpiece.minHumidity = values.minHumidity;
        editingArtpiece.maxHumidity = values.maxHumidity;
        editingArtpiece.minLight = values.minLight;
        editingArtpiece.maxLight = values.maxLight;
        await updateArtpiece(editingArtpiece);
        navigate("/artpieces");
    }

    useEffect(() => {
        if (artpieceId) {
            loadArtpiece(artpieceId);

            if (artpiece) {
                editingArtpiece.artpieceId = artpiece.artpieceId;
                editingArtpiece.name = artpiece.name;
                editingArtpiece.description = artpiece.description;
                editingArtpiece.authorName = artpiece.authorName;
                editingArtpiece.keepRecommendationId = artpiece.keepRecommendation.keepRecommendationId;
                if (tempUnit === "f") {
                    editingArtpiece.minTemperature = celsiusToFahrenheit(artpiece.keepRecommendation.minTemperature);
                    editingArtpiece.maxTemperature = celsiusToFahrenheit(artpiece.keepRecommendation.maxTemperature);
                } else {
                    editingArtpiece.minTemperature = artpiece.keepRecommendation.minTemperature;
                    editingArtpiece.maxTemperature = artpiece.keepRecommendation.maxTemperature;
                }
                editingArtpiece.minHumidity = artpiece.keepRecommendation.minHumidity;
                editingArtpiece.maxHumidity = artpiece.keepRecommendation.maxHumidity;
                editingArtpiece.minLight = artpiece.keepRecommendation.minLight;
                editingArtpiece.maxLight = artpiece.keepRecommendation.maxLight;
            }
        }
    }, [artpieceId, tempUnit, editingArtpiece, loadArtpiece]);

    if (loading) {
        return <LoadingComponent content={t("loading.artpiece").toString()} />
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
                    title={t("artpiece.artpiece")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <IconButton
                        size="large"
                        sx={{
                            color: "white",
                            position: "absolute",
                            zIndex: "999"
                        }}
                        onClick={() => {
                            setOpenDialog(true);
                        }}>
                        <PhotoCamera />
                    </IconButton>
                    <CardMedia
                        component="img"
                        image={artpiece!.photo ? artpiece!.photo.url : placeholder}
                    />
                </CardContent>

                <CardContent>
                    <Formik
                        initialValues={{
                            name: editingArtpiece.name,
                            description: editingArtpiece.description,
                            authorName: editingArtpiece.authorName,
                            minTemperature: editingArtpiece.minTemperature,
                            maxTemperature: editingArtpiece.maxTemperature,
                            minHumidity: editingArtpiece.minHumidity,
                            maxHumidity: editingArtpiece.maxHumidity,
                            minLight: editingArtpiece.minLight,
                            maxLight: editingArtpiece.maxLight,
                            error: null
                        }}
                        onSubmit={(values) => handleFormSubmit(values)}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label={t("artpiece.name").toString()}
                                            placeholder={t("artpiece.name").toString()}
                                            defaultValue={editingArtpiece.name}
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label={t("artpiece.authorName").toString()}
                                            placeholder={t("artpiece.authorName").toString()}
                                            defaultValue={editingArtpiece.authorName}
                                            name="authorName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            multiline
                                            minRows={6}
                                            label={t("artpiece.description").toString()}
                                            placeholder={t("artpiece.description").toString()}
                                            defaultValue={editingArtpiece.description}
                                            name="description"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider variant="middle">
                                            <Typography
                                                sx={{
                                                    color: "hotpink"
                                                }}
                                            >
                                                {t("keeprecommendation.keeprecommendation")}
                                            </Typography>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.minTemperature").toString()}
                                            placeholder={t("keeprecommendation.minTemperature").toString()}
                                            defaultValue={editingArtpiece.minTemperature.toFixed(2)}
                                            name="minTemperature"
                                            InputProps={{ startAdornment: <InputAdornment position="start">°{tempUnit?.toUpperCase()}</InputAdornment> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.maxTemperature").toString()}
                                            placeholder={t("keeprecommendation.maxTemperature").toString()}
                                            defaultValue={editingArtpiece.maxTemperature.toFixed(2)}
                                            name="maxTemperature"
                                            InputProps={{ startAdornment: <InputAdornment position="start">°{tempUnit?.toUpperCase()}</InputAdornment> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.minHumidity").toString()}
                                            placeholder={t("keeprecommendation.minHumidity").toString()}
                                            defaultValue={editingArtpiece.minHumidity.toFixed(2)}
                                            name="minHumidity"
                                            InputProps={{ min: 0, max: 100, startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.maxHumidity").toString()}
                                            placeholder={t("keeprecommendation.maxHumidity").toString()}
                                            defaultValue={editingArtpiece.maxHumidity.toFixed(2)}
                                            name="maxHumidity"
                                            InputProps={{ min: 0, max: 100, startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.minLight").toString()}
                                            placeholder={t("keeprecommendation.minLight").toString()}
                                            defaultValue={editingArtpiece.minLight.toFixed(2)}
                                            name="minLight"
                                            InputProps={{ min: 0, max: 100, startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            type="number"
                                            label={t("keeprecommendation.maxLight").toString()}
                                            placeholder={t("keeprecommendation.maxLight").toString()}
                                            defaultValue={editingArtpiece.maxLight.toFixed(2)}
                                            name="maxLight"
                                            InputProps={{ min: 0, max: 100, startAdornment: <InputAdornment position="start">%</InputAdornment> }}
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

            <PhotoUploadWidget
                loading={loading}
                uploadPhotoWithId={uploadArtpiecePicture}
                id={artpieceId}
                open={openDialog}
                handleClose={setOpenDialog}
                cropperProps={{
                    initialAspectRatio: 1,
                    aspectRatio: 1
                }}
            />
        </ThemeProvider>
    );
})
