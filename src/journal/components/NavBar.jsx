import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Typography, Avatar } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { startLogout } from '../../store/auth';

export const NavBar = ({ drawerWidth = 240, handleDrawerToggle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { photoURL, displayName } = useSelector(state => state.auth);

    const onLogout = () => {
        dispatch(startLogout());
    }

    // const goToProfile = () => {
    //     navigate('/profile');
    // }

    return (
        <AppBar 
            position='fixed'
            sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
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
                    <Typography variant='h6' noWrap component='div'> SeguSocial </Typography>

                    <Grid item>
                        <IconButton /*onClick={goToProfile}*/ sx={{ p: 0 }}>
                            <Avatar alt={displayName} src={photoURL} />
                        </IconButton>

                        <IconButton 
                            color='error'
                            onClick={ onLogout }
                        >
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
