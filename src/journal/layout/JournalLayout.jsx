import { useState } from 'react';
import { Toolbar, Box } from '@mui/material';
import { NavBar, SideBar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }} className='animate__animated animate__fadeIn animate__faster'>
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <SideBar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box 
                component='main'
                sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    display: 'flex', 
                    justifyContent: 'center' 
                }}
            >
                <Box sx={{ width: '90%', maxWidth: '1200px' }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
