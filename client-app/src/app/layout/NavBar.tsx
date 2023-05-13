import { alpha, AppBar, Autocomplete, Avatar, Box, Button, Container, Divider, Icon, IconButton, Link, ListItemIcon, Menu, MenuItem, Stack, styled, Switch, Toolbar, Tooltip, Typography } from '@mui/material';
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

function NavBar() {
  const { t, i18n } = useTranslation();
  const { userStore: { currentUser, isLoggedIn, logout } } = useStore();
  const [checked, setChecked] = useState(localStorage.getItem("i18nextLng") === "uk");

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderColor: theme.palette.common.white,
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.5),
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));

  // const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '16ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
  // }));

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


                {/* <Search>
                  <StyledAutocomplete
                    renderInput={(params) => (
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                          {...params}
                          placeholder='Search...'
                          variant="outlined"
                          size='small'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon sx={{ color: "white" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>)}
                    options={[]}
                    freeSolo
                    handleHomeEndKeys
                    onChange={async (event, value) => {
                      if (value) {
                        if (typeof (value) === 'string') {
                          router.navigate(`/search/${value}`);
                        }
                      }
                    }}
                  />
                </Search> */}

                <Stack direction="row" alignItems="center">
                  <Typography>EN</Typography>
                  <Switch
                    checked={checked}
                    onChange={e => handleChecked(e)}
                    color="default"
                    size="medium"
                  />
                  <Typography>UA</Typography>
                </Stack>

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