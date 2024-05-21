import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {
    const { displayName, uid: userUid } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    // Filtrar las notas para incluir solo las del usuario logueado
    const userNotes = notes.filter(note => note.uid === userUid);

    // Ordenar las notas por fecha en orden descendente
    const sortedNotes = [...userNotes].sort((a, b) => new Date(b.date) - new Date(a.date));

    const drawer = (
        <>
            <Toolbar sx={{ backgroundColor: '#262255', color: '#fff', borderBottom: '1px solid #ccc' }}>
                <Typography variant='h6' noWrap component='div'>
                    Mis entradas
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ overflow: 'auto' }}>
                {sortedNotes.map(note => (
                    <SideBarItem key={note.id} {...note} />
                ))}
            </List>
        </>
    );

    return (
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Mejora la apertura en dispositivos móviles.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant='permanent'
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
