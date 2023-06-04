import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useTranslation } from "react-i18next";
import { theme } from "../../app/themes/theme";
import { Autocomplete, Box, Card, CardContent, CardHeader, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { uk, enGB } from 'date-fns/locale';
import { registerLocale } from "react-datepicker";
import ArtpieceCard from "../artpieces/ArtpieceCard";
import { Exhibition } from "../../app/models/exhibition";
import ExhibitionCard from "../exhibitions/ExhibitionCard";
import { toast } from "react-toastify";
import { OrderFormValues } from "../../app/models/order";

registerLocale("uk", uk);
registerLocale("en", enGB);

export default observer(function OrderForm() {
    const { t } = useTranslation();    
    const navigate = useNavigate();
    const { artpieceStore, exhibitionStore, userStore, orderStore } = useStore();
    const { currentUser } = userStore;
    const { addOrder } = orderStore;
    const { artpiece, loadArtpiece, loading } = artpieceStore;
    const { loadExhibitions, exhibitions, loading: loadingEx } = exhibitionStore;
    const { artpieceId } = useParams<string>();

    const [chosenExhibition, setChosenExhibition] = useState<Exhibition | null>();

    const handleFormSubmit = async (adress : string) => {
        if (chosenExhibition && artpiece) {
            const orderValues = new OrderFormValues(artpiece.artpieceId, chosenExhibition.exhibitionId, adress)
            await addOrder(orderValues);
            navigate(`/orders`);
        } else {
            toast.error("Choose exhibition first");
        }
    }

    useEffect(() => {
        if (artpieceId) {
            loadArtpiece(artpieceId);
        }
        loadExhibitions(currentUser!.id);
    }, [artpieceId, currentUser, loadArtpiece, loadExhibitions]);

    if (loading || loadingEx || !artpiece || !exhibitions) {
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
                    title={t("order.order")}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <Box sx={{ paddingBottom: "20px" }}>
                        <Typography sx={{ paddingLeft: "20px", paddingBottom: "10px" }} color="textSecondary">
                            {t("artpiece.artpiece")}
                        </Typography>
                        <Paper>
                            <ArtpieceCard artpiece={artpiece} />
                        </Paper>
                    </Box>
                    <Box sx={{ paddingBottom: "20px" }}>
                        <Typography sx={{ paddingLeft: "20px", paddingBottom: "10px" }} color="textSecondary">
                            {t("exhibition.exhibition")}
                        </Typography>
                        {chosenExhibition &&
                            <Paper>
                                <ExhibitionCard exhibition={chosenExhibition} />
                            </Paper>}

                        <Autocomplete
                            sx={{
                                marginTop: "20px",
                                display: "inline-block",
                                width: 300
                            }}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    if (newValue && typeof (newValue) !== 'string') {
                                        setChosenExhibition(newValue);
                                    }                                    
                                }
                            }}
                            filterOptions={(options, params) => {
                                const { inputValue } = params;
                                const filtered = options.filter(option => option.name.startsWith(inputValue));
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={exhibitions}
                            getOptionLabel={(option) => {
                                if (typeof (option) === 'string') {
                                    return option;
                                }
                                return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} placeholder={t("exhibition.exhibition").toString()} />
                            )}
                        />
                    </Box>
                    <Formik
                        initialValues={{
                            adress: "",
                            error: null
                        }}
                        onSubmit={(values, { setErrors }) => handleFormSubmit(values.adress).catch(() =>
                            setErrors({ error: "Invalid input" }))
                        }
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            multiline
                                            minRows={3}
                                            label={t("order.adress").toString()}
                                            placeholder={t("order.adress").toString()}
                                            name="adress"
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
