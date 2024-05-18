import { Grid, Typography } from '@mui/material';
import cherryLogo from '../../../public/cherry-logo.png';

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid item xs={12} container justifyContent="center" sx={{ mb: 2 }}>
        <img src={cherryLogo} alt="Cherry Logo" style={{ height: 100, marginBottom: '16px' }} />
      </Grid>

      <Grid 
        item
        className='box-shadow'
        xs={3}
        sx={{ 
          width: { sm: 450 },
          backgroundColor: 'white', 
          padding: 3, 
          borderRadius: 2 
        }}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>
        {children}
      </Grid>
    </Grid>
  )
}
