import { Grid, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

export const ProfileView = () => {
    const { displayName, email, photoURL } = useSelector(state => state.auth);

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', padding: 3 }}
        >
            <Avatar alt={displayName} src={photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="h4">{displayName}</Typography>
            <Typography variant="h6">{email}</Typography>
        </Grid>
    )
}
