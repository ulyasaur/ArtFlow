import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/themes/theme";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";
import { router } from "../../app/router/router";
import backgroundPic from "../../assets/backgroud-picture.jpg";
import { useTranslation } from "react-i18next";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {    
  const { t, i18n } = useTranslation();
    const { userStore } = useStore();
    const { currentUser } = userStore;

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw"
                }}
            >
                <Avatar
                    alt="display name"
                    src={profile.image ? profile.image?.url : userPlaceHolder}
                    variant="rounded"
                    sx={{
                        display: "block",
                        paddingTop: "170px",
                        paddingLeft: "20px",
                        position: "absolute",
                        width: 100,
                        height: 100
                    }}
                />
                <CardMedia
                    sx={{ height: 250 }}
                    image={backgroundPic}
                />
                <CardContent>
                    <Grid
                        container
                    >
                        <Grid
                            xs={8}
                            sx={{
                                position: "relative",
                                paddingTop: "20px",
                            }}
                        >
                            <Typography variant="h5" component="h2">
                                {profile.firstName} {profile.lastName}
                            </Typography>
                            <Typography color="textSecondary">
                                @{profile.username}
                            </Typography>
                            <Typography color="textSecondary">
                                {t("roles." + profile.role)}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={4}
                            sx={{
                                paddingTop: "10px"
                            }}
                        >
                            {(currentUser?.id === profile.id)
                                ? <Button
                                    sx={{
                                        width: "100%"
                                    }}
                                    variant="outlined"
                                    onClick={() => router.navigate("/settings")}
                                >
                                    {t("profile.edit")}
                                </Button>
                                : null }

                        </Grid>
                        <Grid
                            xs={8}
                            sx={{
                                paddingTop: "10px"
                            }}
                        >
                            <Typography variant="h6" component="p">
                                {profile.bio}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})