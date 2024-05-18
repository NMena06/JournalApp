import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { startLogout } from '../../store/auth';
import cherryLogo from '../../../public/cherry-logo.png'; // Asegúrate de que la ruta es correcta

export const NavBar = ({ drawerWidth = 240, handleDrawerToggle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { photoURL, displayName } = useSelector(state => state.auth);

    const [openDialog, setOpenDialog] = useState(false);

    const openProfileDialog = () => {
        setOpenDialog(true);
    };

    const closeProfileDialog = () => {
        setOpenDialog(false);
    };

    const onLogout = () => {
        dispatch(startLogout());
    };

    return (
        <>
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuOutlined />
                    </IconButton>

                    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={cherryLogo} alt="Cherry Logo" style={{ height: 40, marginRight: 10 }} />
                            </Link>
                        </Grid>

                        
                        <Grid item>
           

                            <IconButton sx={{ p: 0 }} onClick={openProfileDialog}>
                            <Grid item>
                            <Typography sx={{color:'white', marginRight:'2px'}} >{displayName}</Typography>
                            </Grid>
                                <Avatar alt={displayName} src={photoURL} />
                            </IconButton>
                            {/* 
                            <IconButton 
                                color='error'
                                onClick={onLogout}
                            >
                                <LogoutOutlined />
                            </IconButton> */}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Profile Dialog */}
            <Dialog open={openDialog} onClose={closeProfileDialog}>
                <DialogTitle>{displayName}</DialogTitle>
                <DialogContent>
                    <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Ir a perfil</Link>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeProfileDialog}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
