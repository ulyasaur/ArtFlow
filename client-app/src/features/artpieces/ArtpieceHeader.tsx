import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../app/themes/theme";
import backgroundPic from "../../assets/backgroud-picture.jpg";
import UserCard from "../users/UserCard";
import { Artpiece } from "../../app/models/artpiece";
import placeholder from "../../assets/placeholder.png";
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    artpiece: Artpiece;
}

export default observer(function ArtpieceHeader({ artpiece }: Props) {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <CardContent>
                <Grid
                    container
                >
                    <Grid
                        xs={8}
                    >
                        <Card>
                            <Avatar
                                alt="display name"
                                src={artpiece.photo ? artpiece.photo?.url : placeholder}
                                variant="rounded"
                                sx={{
                                    display: "block",
                                    paddingTop: "107px",
                                    paddingLeft: "20px",
                                    position: "absolute",
                                    width: 100,
                                    height: 100
                                }}
                            />
                            <CardMedia
                                sx={{ height: 185 }}
                                image={backgroundPic}
                            />
                            <CardContent sx={{ paddingTop: "30px" }}>
                                <Typography
                                    fontWeight={"bold"}
                                    variant="h5" component="h2">
                                    {artpiece.name}
                                </Typography>

                                {artpiece.authorName
                                    ? <Typography color="textSecondary">
                                        <PersonIcon fontSize="inherit" /> {artpiece.authorName}
                                    </Typography>
                                    : <Typography color="textSecondary">
                                        <PersonIcon fontSize="inherit" /> {t("artpiece.unknown")}
                                    </Typography>}

                                <Box sx={{ paddingTop: "10px" }}>
                                    {artpiece.description
                                        ? <Typography variant="h6">
                                            {artpiece.description}
                                        </Typography>
                                        : <Typography color="textSecondary">
                                            {t("artpiece.description")}
                                        </Typography>}
                                </Box>

                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid
                        xs={4}
                    >
                        <UserCard user={artpiece.owner} description={t("roles.ArtOwner")} />
                        <Card sx={{marginLeft: "10px"}}>
                            <CardHeader
                                sx={{
                                    textAlign: "center",
                                    backgroundColor: "hotpink",
                                    color: "white"
                                }}
                                title={t("keeprecommendation.keeprecommendation")}
                                titleTypographyProps={{
                                    display: "inline-block",
                                    fontSize: "13pt",
                                    fontWeight: "bold"
                                }}
                            />
                            <CardContent>
                            <Typography>
                                    {`${t("keeprecommendation.minTemperature")}: ${artpiece.keepRecommendation.minTemperature}°C`}
                                </Typography>
                                <Typography>
                                    {`${t("keeprecommendation.maxTemperature")}: ${artpiece.keepRecommendation.maxTemperature}°C`}
                                </Typography>
                                <Typography>
                                    {`${t("keeprecommendation.minHumidity")}: ${artpiece.keepRecommendation.minHumidity}%`}
                                </Typography>
                                <Typography>
                                    {`${t("keeprecommendation.maxHumidity")}: ${artpiece.keepRecommendation.maxHumidity}%`}
                                </Typography>
                                <Typography>
                                    {`${t("keeprecommendation.minLight")}: ${artpiece.keepRecommendation.minLight}%`}
                                </Typography>
                                <Typography>
                                    {`${t("keeprecommendation.maxLight")}: ${artpiece.keepRecommendation.maxLight}%`}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </ThemeProvider>
    );
})