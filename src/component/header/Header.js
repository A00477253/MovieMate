import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Movie } from "@mui/icons-material";

const Header = ({ pathVal }) => {
    const navigate = useNavigate();

    const [pathValue, setPathValue] = useState(pathVal);

    const [openSideNav, setOpenSideNav] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem("userData");
        navigate('/')
    }

    const addMovie = () => {
        navigate('/addMovie')
    }
    const addActor = () => {
        navigate('/addActor')
    }
    const deleteActor = () => {
        navigate('/deleteActor')
    }
    const addGenre = () => {
        navigate('/addGenre')
    }
    const deleteGenre = () => {
        navigate('/deleteGenre')
    }


    useEffect(() => {
        setPathValue(pathVal)
    }, [pathVal])

    console.log(pathValue, 'pathValuepathValue')

    const userObject = JSON.parse(localStorage.getItem("userData"));
    return (
        <div className="header">
            {userObject && pathValue === '/moviehome' && (
                <MenuIcon onClick={() => setOpenSideNav(true)} />
            )}
            <Drawer
                anchor="left"
                open={openSideNav}
                onClose={() => setOpenSideNav(false)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => logoutUser()}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                    {userObject?.username === "producer" && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => addMovie()}>
                                <ListItemIcon>
                                    <MovieIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add Movie" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {userObject?.username === "admin" && (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => addMovie()}>
                                    <ListItemIcon>
                                        <MovieIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Movie" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => addActor()}>
                                    <ListItemIcon>
                                        <PersonAddAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Actor" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => deleteActor()}>
                                    <ListItemIcon>
                                        <PersonAddDisabledIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete Actor" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => addGenre()}>
                                    <ListItemIcon>
                                        <VideoCameraBackIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Genre" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => deleteGenre()}>
                                    <ListItemIcon>
                                        <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Delete Genre" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                </List>


            </Drawer>
            <Link to="/" className="header__logo">
                <img src={process.env.PUBLIC_URL + '/moviemate.png'} alt="MovieMate Logo" />
            </Link>
            {(!userObject && (pathValue !== '/login' && pathValue !== '/register')) && (
                <>
                    <Link to="/Register" className="header__link" style={{ textDecoration: "none" }}> <span>Register</span></Link>
                    <Link to="/Login" className="header__link" style={{ textDecoration: "none" }}><span>Login</span></Link>
                </>
            )}

        </div>
    );
}

export default Header;
