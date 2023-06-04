import { Box, FormControl, FormControlLabel, IconButton, Menu, Radio, RadioGroup, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../themes/theme";
import LanguageIcon from '@mui/icons-material/Language';

export default observer(function LanguageSwitch() {
    const { t, i18n } = useTranslation();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        i18n.changeLanguage(event.target.value);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 0, padding: "2px" }}>
                <IconButton onClick={handleOpenUserMenu}>
                    <LanguageIcon sx={{ color: "white" }}/>
                    <Typography sx={{ color: "white" }}>{localStorage.getItem("i18nextLng")?.toUpperCase()}</Typography>
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <Box sx={{ paddingLeft: "20px", paddingRight: "10px" }}>
                        <FormControl>
                            <RadioGroup
                                defaultValue={localStorage.getItem("i18nextLng")}
                                onChange={e => {
                                    handleChange(e);
                                    handleCloseUserMenu();
                                }}
                            >
                                <FormControlLabel value="uk" control={<Radio />} label={t("lang.uk")} />
                                <FormControlLabel value="en" control={<Radio />} label={t("lang.en")} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Menu>
            </Box>
        </ThemeProvider>
    );
})