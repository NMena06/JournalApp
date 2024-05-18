import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, TextField, Avatar } from '@mui/material';
import { format } from 'date-fns';
import { StarOutline } from '@mui/icons-material';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';

export const NothingSelectedView = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector(state => state.journal);

  // Ordenar las notas por fecha en orden descendente
  const sortedNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3, padding: 2 }}
    >
      <Grid item xs={12} sx={{ mb: 2, width: '100%' }}>
        <Typography variant='h6' noWrap component='div' sx={{ color: 'white', textAlign: 'left' }}>
          Inicio
        </Typography>
      </Grid>

      {sortedNotes.length > 0 ? (
        sortedNotes.map(note => {
          const { id, title, body, date, imageUrls, creatorDisplayName, creatorPhotoURL } = note;
          const dateString = format(new Date(date), "dd/MM/yyyy HH:mm:ss");

          const handleSaveNote = () => {
            dispatch(setActiveNote(note));
            dispatch(startSaveNote());
          };

          const handleFileInputChange = ({ target }) => {
            if (target.files.length === 0) return;
            dispatch(setActiveNote(note));
            dispatch(startUploadingFiles(target.files));
          };

          const handleDelete = () => {
            dispatch(setActiveNote(note));
            dispatch(startDeletingNote());
          };

          return (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1, backgroundColor: 'white', borderRadius: 2, padding: 2, width: '100%', marginTop:'15px' }}
              key={id}
            >

              <Grid item>
                <Typography variant='h9' fontWeight="bold">
                  {creatorDisplayName}
                </Typography>
              </Grid>

              <Grid item sx={{ mr: 2 }}>
                <Avatar alt={creatorDisplayName} src={creatorPhotoURL} />
              </Grid>

              <Grid container>
              <Grid item>
                <Typography variant='h5' fontWeight="light" >
                  {title}
                </Typography>
              </Grid>
                {/* <TextField
                  type="h5"
                  variant='standard'
                  fullWidth
                  placeholder="Ingrese un título"
                  sx={{ border: "none", mb: 1 }}
                  name="title"
                  value={title}
                  disabled
                /> */}
              </Grid>

              <ImageGallery images={imageUrls} />
              <Grid item>
                <input
                  type="file"
                  multiple
                  id={`fileInput-${id}`}
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
                <Grid item>
                  <Typography fontSize={12} fontWeight="light" sx={{ marginTop: '-10px' }}>
                    {dateString}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Typography variant='h9' noWrap component='div' sx={{ textAlign: 'left', marginTop: '10px' }}>
                  Comentarios
                </Typography>

                <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  multiline
                  placeholder="Agrega un comentario"
                  minRows={2}
                  name="body"
                  value={body}
                  
                />

              </Grid>

              <Grid container justifyContent="end">
                {/* <Button onClick={handleDelete} sx={{ mt: 2 }} color="error">
                  <DeleteOutline />
                  Borrar
                </Button> */}
              </Grid>
            </Grid>
          );
        })
      ) : (
        <>
          <Grid item xs={12}>
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant='h5'>Selecciona o crea una nuevo post</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};
