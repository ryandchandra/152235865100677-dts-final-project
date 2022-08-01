import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// import Search from '@mui/icons-material/Search';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../authentication/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const pages = [
    { display: 'Home', path: "/" }, 
    { display: 'Categories', path: "/category" }, 
    { display: 'Ingredients', path: "/ingredient" },
    { display: 'Browse', path: "/search" },
    { display: 'Surprise Me!', path: "/random" }
];

const NavBar = () => {
    const [user] = useAuthState(auth);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event, target) => {
        setAnchorElNav(null);
        navigate(target);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AppBar position="sticky" sx={{ boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Avatar
                            alt="DAN"
                            src="/images/logo/logo-white.png"
                            sx={{ width: 45, height: 45, display: { xs: 'none', md: 'flex' }, mr: 12 }}
                            variant="square"
                        // onClick={navigate("/")}
                        />
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            { pages.map((item) => <Typography key={item.display} onClick={(event) => handleCloseNavMenu(event,item.path)} sx={{ padding: "0.5rem 1rem" }}>{item.display}</Typography>) }
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((item) => (
                            <Button
                                key={item.display}
                                // onClick={handleCloseNavMenu}
                                onClick={() => navigate(item.path)}
                                sx={{ my: 2, display: 'block' }}
                                color="info" >
                                {item.display}
                            </Button>
                        ))}
                    </Box>
                    {/* <IconButton size="large" aria-label="search" color="info" sx={{ mr: 2 }}>
                        <Search />
                    </IconButton> */}
                    { user ? ( 
                        <>
                            <Typography color="info" sx={{ mr: 2 }}>{user?.email}</Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <Avatar alt="User" sx={{ height: 45, width: 45 }} />
                                    <Tooltip title="Logout">
                                        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                                            <ArrowDropDown fontSize="large" sx={{ color: grey[100] }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
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
                                    onClose={handleCloseUserMenu} >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </> 
                    ) : (
                        <Button href="/login" color="info">Login</Button>
                    ) }
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default NavBar;