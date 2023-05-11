import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Exhibition } from "../../app/models/exhibition";
import { Card, CardContent, CardMedia, Grid, ListItem, ListItemText, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../app/themes/theme";
import backgroundPic from "../../assets/backgroud-picture.jpg";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserCard from "../users/UserCard";
import FormatFullDate from "../../app/formatting/formatFullDate";

interface Props {
    exhibition: Exhibition;
}

export default observer(function ExhibitionHeader({ exhibition }: Props) {
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
                            <CardMedia
                                sx={{ height: 150 }}
                                image={backgroundPic}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight={"bold"} 
                                    variant="h5" component="h2">
                                    {exhibition.name}
                                </Typography>

                                {exhibition.description
                                    ? <Typography color="textSecondary" variant="h6" component="p">
                                        {exhibition.description}
                                    </Typography>
                                    : <Typography color="textSecondary" variant="h6" component="p">
                                        {t("exhibition.description")}
                                    </Typography>}
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid
                        xs={4}
                    >
                        <UserCard user={exhibition.organiser} description={t("roles.Organiser")} />
                        <Typography sx={{ paddingLeft: "20px" }} color="textSecondary">
                            {t("exhibition.about")}
                        </Typography>
                        <ListItem>
                            <ListItemText>
                                <Typography color="textSecondary">
                                    <CalendarMonthIcon fontSize="inherit" />

                                    {
                                        FormatFullDate(exhibition.startDate.toString()) === FormatFullDate(exhibition.endDate.toString())
                                            ? ` ${FormatFullDate(exhibition.startDate.toString())}`
                                            : ` ${FormatFullDate(exhibition.startDate.toString())} - ${FormatFullDate(exhibition.endDate.toString())}`
                                    }
                                </Typography>
                                <Typography color="textSecondary">
                                    <LocationOnIcon fontSize="inherit" />
                                    {exhibition.adress}
                                </Typography>
                            </ListItemText>

                        </ListItem>
                    </Grid>
                </Grid>
            </CardContent>
        </ThemeProvider>
    );
})