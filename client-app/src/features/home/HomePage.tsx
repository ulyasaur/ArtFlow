import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import RegisterForm from '../account/RegisterForm';
import { Stack, Switch, Tab, Tabs, Typography } from '@mui/material';
import LoginForm from '../account/LoginForm';
import { TabContext, TabPanel } from '@mui/lab';
import { theme } from '../../app/themes/theme';
import { useStore } from '../../app/stores/store';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import backgroundPic from "../../assets/backgroud-picture.jpg";
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../app/common/switches/LanguageSwitch';

export default observer(function HomePage() {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState("1");
    const [checked, setChecked] = useState(localStorage.getItem("i18nextLng") === "uk");
    const { userStore } = useStore();
    const location = useLocation();

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            i18n.changeLanguage('uk');
            localStorage.setItem("i18nextLng", "uk");
            setChecked(true);
        } else {
            i18n.changeLanguage('en');
            localStorage.setItem("i18nextLng", "en");
            setChecked(false);
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (userStore.isLoggedIn) {
        return <Navigate to={`profile/${userStore.currentUser?.username}`} state={{ from: location }} />
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    position: 'absolute',
                    marginLeft: "20px",
                    marginTop: "10px",
                    backgroundColor: "hotpink",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    borderRadius: "20px"
                }}>
                    <LanguageSwitch />
            </Box>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundPic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <TabContext value={value}>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label={t("login.login")} value="1" />
                                <Tab label={t("signup.signup")} value="2" />
                            </Tabs>
                        </Box>
                        <TabPanel value='1'><LoginForm setValue={setValue} /></TabPanel>
                        <TabPanel value='2'><RegisterForm setValue={setValue} /></TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
})