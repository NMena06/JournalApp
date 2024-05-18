import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { AccountBoxOutlined, AccountBoxRounded, AddBoxOutlined, AddBoxRounded, ExitToAppRounded, HomeRounded, LogoutOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';
import { startLogout } from '../../store/auth';  // Import the logout action

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}

      {/* Navbar at the bottom of the page */}
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          backgroundColor: '#2C2B2D', // Color del AppBar
          borderTop: '1px solid rgba(0, 0, 0, 0.2)', // Upper border
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Profile Button */}
          
          <IconButton
            size='small'
            sx={{
              color: 'white',
              ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <HomeRounded sx={{ fontSize: 24 }} />
            </Link>
          </IconButton>
          <IconButton
            size='small'
            sx={{
              color: 'white',
              ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
              <AccountBoxRounded sx={{ fontSize: 24 }} />
            </Link>
          </IconButton>

          {/* New Note Button */}
          <IconButton
            onClick={onClickNewNote}
            size='small'
            disabled={isSaving}
            sx={{
              color: 'white',
              ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <AddBoxRounded sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Logout Button */}

            <IconButton
            onClick={onLogout}
            size='small'
            disabled={isSaving}
            sx={{
              color: 'white',
              ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <ExitToAppRounded sx={{ fontSize: 24 }} />
          </IconButton>
  
      
        </Toolbar>
      </AppBar>
    </JournalLayout>
  );
};
