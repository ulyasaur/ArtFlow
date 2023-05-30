import { Box, FormControl, FormControlLabel, IconButton, Menu, Radio, RadioGroup, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { theme } from "../../themes/theme";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { useStore } from "../../stores/store";

export default observer(function TemperatureSwitch() {
    const { artpieceStore } = useStore();
    const { tempUnit, setTempUnit } = artpieceStore;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTempUnit(event.target.value);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 0, padding: "2px" }}>
                <IconButton onClick={handleOpenUserMenu}>
                    <DeviceThermostatIcon sx={{ color: "white" }}/>
                    <Typography sx={{ color: "white" }}>°{tempUnit?.toUpperCase()}</Typography>
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
                                defaultValue={tempUnit}
                                onChange={e => {
                                    handleChange(e);
                                    handleCloseUserMenu();
                                }}
                            >
                                <FormControlLabel value="c" control={<Radio />} label="°C" />
                                <FormControlLabel value="f" control={<Radio />} label="°F" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Menu>
            </Box>
        </ThemeProvider>
    );
})