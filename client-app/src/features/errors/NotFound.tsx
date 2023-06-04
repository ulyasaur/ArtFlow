import { ThemeProvider } from "@emotion/react";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../app/themes/theme";
import NotFoundRobot from '../../assets/not-found.jpg';
import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const {t} = useTranslation();
    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    height: "89vh"
                }}>
                <CardContent>
                    <Grid container >
                        <Grid xs={6}>
                            <img src={NotFoundRobot} alt="not-found" style={{ width: "100%", height: "auto" }} />
                        </Grid>
                        <Grid xs={6}
                            sx={{
                                display: "flex",
                                verticalAlign: "middle"
                            }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontSize: "20pt",
                                    fontWeight: "bold",
                                    marginTop: "auto",
                                    marginBottom: "auto"
                                }}>
                                {t("error.not-found")}
                                <Link
                                    style={{
                                        textDecoration: "none"
                                    }}
                                    component={RouterLink} to="/">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontSize: "12pt"
                                        }}
                                    >
                                        {t("error.return")}
                                    </Button>
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ThemeProvider >

    );
}