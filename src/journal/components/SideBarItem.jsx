import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
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
            <ListItemButton onClick={onClickNote} sx={{ py: 2 }}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={9} md={10}>
                        <ListItemText
                            primary={<Typography variant="subtitle1">{newTitle}</Typography>}
                            secondary={<Typography variant="body2" color="text.secondary">{formattedDate}</Typography>}
                        />
                    </Grid>
                    <Grid item xs={3} md={2} textAlign="right">
                        <Typography variant="caption">{body}</Typography>
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
