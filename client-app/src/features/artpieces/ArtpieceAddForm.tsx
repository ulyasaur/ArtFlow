import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardContent, CardHeader, Divider, Grid, InputAdornment, ThemeProvider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhotoCropper from "../../app/common/photo/PhotoCropper";
import PhotoDropzone from "../../app/common/photo/PhotoDropzone";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { ArtpieceFormValues } from "../../app/models/artpiece";
import fahrenheitToCelsius from "../../app/formatting/temperature/fahrenheitToCelsius";

export default observer(function ArtpieceAddForm() {
    const { t } = useTranslation();
    const { artpieceStore } = useStore();
    const { addArtpiece, tempUnit } = artpieceStore;
    const navigate = useNavigate();

    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const handleFormSubmit = async (values: any) => {
        if (cropper && files && files.length > 0) {
            const artpiece = new ArtpieceFormValues();
            const canvas = cropper.getCroppedCanvas();
            artpiece.photo = await new Promise(resolve => canvas.toBlob(resolve));
            artpiece.name = values.name;
            artpiece.description = values.description;
            artpiece.authorName = values.authorName;
            if (tempUnit === "f") {
                artpiece.minTemperature = fahrenheitToCelsius(parseFloat(values.minTemperature));
                artpiece.maxTemperature = fahrenheitToCelsius(parseFloat(values.maxTemperature));
            } else {
                artpiece.minTemperature = values.minTemperature;
                artpiece.maxTemperature = values.maxTemperature;
            }
            artpiece.minHumidity = values.minHumidity;
            artpiece.maxHumidity = values.maxHumidity;
            artpiece.minLight = values.minLight;
            artpiece.maxLight = values.maxLight;
            await addArtpiece(artpiece);
            setFiles([]);
            navigate("/artpieces");
        } else {
            toast.error("Add photo first");
        }
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
                    {files && files.length > 0
                        ? <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview}
                            props={{
                                initialAspectRatio: 1,
                                aspectRatio: 1
                            }}
                        />
                        : <PhotoDropzone setFiles={setFiles} />
                    }
                </CardContent>

                <CardContent>
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            authorName: "",
                            minTemperature: 0,
                            maxTemperature: 0,
                            minHumidity: 0,
                            maxHumidity: 0,
                            minLight: 0,
                            maxLight: 0,
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
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label={t("artpiece.authorName").toString()}
                                            placeholder={t("artpiece.authorName").toString()}
                                            name="authorName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            multiline
                                            minRows={6}
                                            label={t("artpiece.description").toString()}
                                            placeholder={t("artpiece.description").toString()}
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
        </ThemeProvider>
    );
})
