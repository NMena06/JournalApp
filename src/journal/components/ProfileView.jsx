import React from 'react';
import { Grid, Typography, Avatar, IconButton, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {
    const { displayName, email, photoURL } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleEditProfile = () => {
        // Implement edit profile functionality
        console.log('Edit profile clicked');
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', padding: 3 }}
        >
            <IconButton
                sx={{ position: 'absolute', top: 10, left: 10 }}
                onClick={handleHomeClick}
                aria-label="back to home"
            >
                <ArrowBackIcon />
            </IconButton>
            <Avatar alt={displayName} src={photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="h4" sx={{ mb: 1 }}>{displayName}</Typography>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>{email}</Typography>
            
            {/* Detalles adicionales del perfil */}
            <Typography variant="body1" sx={{ mb: 1 }}>Fecha de registro: - - -</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Teléfono: - - -</Typography>
            
            {/* Botón para editar perfil */}
            <Button variant="contained" onClick={handleEditProfile} sx={{ mb: 2 }}>
                Editar perfil
            </Button>
        </Grid>
    );
};

export default ProfileView;
