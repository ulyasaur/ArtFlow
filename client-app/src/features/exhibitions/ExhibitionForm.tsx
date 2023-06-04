import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Card, CardContent, CardHeader, Grid, ThemeProvider, Typography } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { Exhibition } from "../../app/models/exhibition";
import FormDatePicker from "../../app/common/form/FormDatePicker";
import { uk, enGB } from 'date-fns/locale';
import { registerLocale } from "react-datepicker";
import dayjs from "dayjs";

registerLocale("uk", uk);
registerLocale("en", enGB);

export default observer(function ExhibitionForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { exhibitionStore, userStore } = useStore();
    const { currentUser } = userStore;
    const { loading, exhibition, addExhibition, updateExhibition, loadExhibition } = exhibitionStore;
    const { exhibitionId } = useParams<string>();

    const [editingExhibition, setEditingExhibition] = useState<Exhibition>(new Exhibition());

    const handleFormSubmit = async (values: any) => {
        if (!editingExhibition.exhibitionId) {
            editingExhibition.name = values.name;
            editingExhibition.description = values.description;
            editingExhibition.organiserId = currentUser!.id;
            editingExhibition.startDate = values.startDate.toDate();
            editingExhibition.endDate = values.endDate.toDate();
            editingExhibition.adress = values.adress;
            await addExhibition(editingExhibition);
            navigate(`/exhibitions`);
        } else {
            editingExhibition.name = values.name;
            editingExhibition.description = values.description;
            editingExhibition.startDate = values.startDate.toDate();
            editingExhibition.endDate = values.endDate.toDate();
            editingExhibition.adress = values.adress;

            await updateExhibition(editingExhibition);
            navigate(`/exhibitions/${editingExhibition.exhibitionId}`);
        }
    }

    useEffect(() => {
        if (exhibitionId) {
            loadExhibition(exhibitionId);

            if (exhibition) {
                editingExhibition.exhibitionId = exhibition.exhibitionId;
                editingExhibition.name = exhibition.name;
                editingExhibition.description = exhibition.description;
                editingExhibition.organiserId = exhibition.organiserId;
                editingExhibition.startDate = exhibition.startDate;
                editingExhibition.endDate = exhibition.endDate;
                editingExhibition.adress = exhibition.adress;
            }
        }
    }, [exhibitionId, loadExhibition]);

    if (loading) {
        return <LoadingComponent content={t("loading.exhibition").toString()} />
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
                    title={t("exhibition.exhibition")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <Formik
                        initialValues={{
                            name: editingExhibition.name,
                            description: editingExhibition.description,
                            startDate: dayjs(editingExhibition.startDate),
                            endDate: dayjs(editingExhibition.endDate),
                            adress: editingExhibition.adress,
                            error: null
                        }}
                        onSubmit={(values, { setErrors }) => handleFormSubmit(values).catch(() =>
                            setErrors({ error: "Invalid input" }))
                        }
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label={t("exhibition.name").toString()}
                                            placeholder={t("exhibition.name").toString()}
                                            defaultValue={editingExhibition.name}
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            multiline
                                            minRows={3}
                                            label={t("exhibition.adress").toString()}
                                            placeholder={t("exhibition.adress").toString()}
                                            defaultValue={editingExhibition.adress}
                                            name="adress"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormDatePicker
                                            label={t("exhibition.start").toString()}
                                            defaultValue={dayjs(editingExhibition.startDate)}
                                            name='startDate'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormDatePicker
                                            label={t("exhibition.end").toString()}
                                            defaultValue={dayjs(editingExhibition.endDate)}
                                            name='endDate'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            multiline
                                            minRows={6}
                                            label={t("exhibition.description").toString()}
                                            placeholder={t("exhibition.description").toString()}
                                            defaultValue={editingExhibition.description}
                                            name="description"
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
