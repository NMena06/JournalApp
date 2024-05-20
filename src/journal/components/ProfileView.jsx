// ProfileView.js
import React, { useState } from 'react';
import { Grid, Typography, Avatar, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../store/auth';
import { fileUpload } from '../../helpers'; // Importamos la función de subida de archivos

const ProfileView = () => {
    const { displayName, email, photoURL } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(displayName);
    const [newPhotoURL, setNewPhotoURL] = useState(photoURL);
    const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const [uploading, setUploading] = useState(false); // Estado para controlar el proceso de subida
    const [uploadSuccess, setUploadSuccess] = useState(false); // Estado para mostrar mensaje de éxito

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleEditProfile = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Limpiar estado al cerrar el diálogo
        setSelectedFile(null);
        setUploadSuccess(false);
        setUploading(false);
    };

    const handleSaveProfile = async () => {
        if (selectedFile) {
            try {
                setUploading(true); // Iniciar proceso de subida
                // Subir la imagen al servicio y obtener la URL
                const imageUrl = await fileUpload(selectedFile);
                setNewPhotoURL(imageUrl); // Actualizar el estado de la nueva URL de la foto de perfil
                setUploadSuccess(true); // Mostrar mensaje de éxito
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                return;
            } finally {
                setUploading(false); // Finalizar proceso de subida
            }
        }

        // Disparar acción para editar el perfil
        dispatch(editProfile({ displayName: newDisplayName, photoURL: newPhotoURL }));
        setOpen(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Almacenar el archivo seleccionado en el estado
            const newPhotoURL = URL.createObjectURL(file);
            setNewPhotoURL(newPhotoURL);
        }
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

            {/* Diálogo para editar perfil */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Perfil</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="displayName"
                        label="Nombre de Usuario"
                        type="text"
                        fullWidth
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handlePhotoChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                            Cambiar Foto de Perfil
                        </Button>
                    </label>
                    {selectedFile && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Archivo seleccionado: {selectedFile.name}
                        </Typography>
                    )}
                    {uploading && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Subiendo imagen...
                        </Typography>
                    )}
                    {uploadSuccess && (
                        <Typography variant="body2" color="success" sx={{ mt: 1 }}>
                            Foto subida con éxito
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={uploading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={uploading}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ProfileView;
