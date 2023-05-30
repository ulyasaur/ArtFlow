import { AppBar, Avatar, Box, Button, Container, Divider, Icon, IconButton, Link, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import logo from "../../assets/logo.png";
import userPlaceholder from "../../assets/user.png";
import * as React from 'react';
import { useStore } from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import { Logout, Settings } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../themes/theme';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from "react-router-dom";
import { router } from '../router/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../common/switches/LanguageSwitch';
import TemperatureSwitch from '../common/switches/TemperatureSwitch';

function NavBar() {
  const { t, i18n } = useTranslation();
  const { userStore: { currentUser, isLoggedIn, logout } } = useStore();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          position: "absolute"
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Icon
              sx={{
                padding: "4px"
              }}
            >
              <img alt="artflow" height={27} width={27} src={logo} />
            </Icon>
            <Link component={RouterLink} to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                ARTFLOW
              </Typography>
            </Link>


            {isLoggedIn &&
              <>
                {currentUser?.role === "Organiser" &&
                  <>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <Link
                        component={RouterLink}
                        to={`/exhibitions`}
                        sx={{
                          color: "black", textDecoration: "none"
                        }}
                      >
                        <Button
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {t("navbar.exhibitions")}
                        </Button>
                      </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <Link
                        component={RouterLink}
                        to={`/artpieces/available`}
                        sx={{
                          color: "black", textDecoration: "none"
                        }}
                      >
                        <Button
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {t("navbar.artpieces")}
                        </Button>
                      </Link>
                    </Box>
                  </>
                }

                {currentUser?.role === "ArtOwner" &&
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Link
                      component={RouterLink}
                      to={`/artpieces`}
                      sx={{
                        color: "black", textDecoration: "none"
                      }}
                    >
                      <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {t("navbar.artpieces")}
                      </Button>
                    </Link>
                  </Box>

                }

                {currentUser?.role === "Driver" &&
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Link
                      component={RouterLink}
                      to={`/orders/available`}
                      sx={{
                        color: "black", textDecoration: "none"
                      }}
                    >
                      <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {t("navbar.available")}
                      </Button>
                    </Link>
                  </Box>
                }

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Link
                    component={RouterLink}
                    to={`/orders`}
                    sx={{
                      color: "black", textDecoration: "none"
                    }}
                  >
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {t("navbar.orders")}
                    </Button>
                  </Link>
                </Box>

                <TemperatureSwitch />
                <LanguageSwitch />

                <Box sx={{ flexGrow: 0, padding: "2px" }}>
                  <Tooltip title={t("navbar.menu")}>
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar alt={currentUser?.firstName + " " + currentUser?.lastName} src={currentUser?.photo ? currentUser?.photo?.url : userPlaceholder} />
                    </IconButton>
                  </Tooltip>
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
                    <MenuItem onClick={() => {
                      handleCloseUserMenu();
                      router.navigate("/");
                    }}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      {t("navbar.profile")}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                      router.navigate("/settings");
                      handleCloseUserMenu();
                    }}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      {t("navbar.settings")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      {t("navbar.logout")}
                    </MenuItem>
                  </Menu>
                </Box>
              </>}
          </Toolbar>
        </Container>
      </AppBar >
    </ThemeProvider>
  );
}
export default observer(NavBar);