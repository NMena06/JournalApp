import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Grid, Paper, Avatar } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], creatorDisplayName, creatorPhotoURL }) => {
    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    };

    const newTitle = useMemo(() => {
        return title.length > 40 ? title.substring(0, 40) + '...' : title;
    }, [title]);

    const formattedDate = useMemo(() => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }, [date]);

    return (
        <ListItem disablePadding>
            <Paper elevation={3} sx={{ width: '100%', borderRadius: 3, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <ListItemButton onClick={onClickNote} sx={{ py: 2 }}>
                    <Grid container alignItems="center">

                        <Grid item xs={10}>
                            <ListItemText
                                primary={<Typography variant="subtitle1" noWrap>{newTitle}</Typography>}
                                secondary={<Typography variant="body2" color="text.secondary">{formattedDate}</Typography>}
                            />
                        </Grid>
                    </Grid>
                </ListItemButton>
            </Paper>
        </ListItem>
    );
};
