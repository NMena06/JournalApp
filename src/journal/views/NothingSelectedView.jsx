import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField, Avatar, Button } from '@mui/material';
import { format } from 'date-fns';
import Swal from 'sweetalert2'; // Importa SweetAlert

import { ImageGallery } from '../components';
import { StarOutline } from '@mui/icons-material';
import { loadNotes } from '../../helpers';
import { startSaveComment } from '../../store/journal';

export const NothingSelectedView = () => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const [comment, setComment] = useState('');
  const [messageSaved, setMessageSaved] = useState(''); // Estado para mensaje de confirmación

  useEffect(() => {
      const fetchNotes = async () => {
          const notesData = await loadNotes();
          setNotes(notesData);
      };

      fetchNotes();
  }, []);

  const sortedNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSaveComment = async (noteId) => {
      const note = notes.find(note => note.id === noteId);
      if (!note) return;

      if (comment.trim().length > 0) {
          await dispatch(startSaveComment(noteId, comment));
          setComment('');
          setMessageSaved('Comentario agregado'); // Actualiza el estado del mensaje guardado
          // Update notes locally instead of fetching from Firestore again
          const updatedNotes = notes.map(note => note.id === noteId ? {
              ...note,
              comments: [...note.comments, {
                  body: comment,
                  commentDisplayName: 'Current User', // Replace with actual display name
                  commentPhotoURL: 'https://example.com/photo.jpg' // Replace with actual photo URL
              }]
          } : note);
          setNotes(updatedNotes);
      }
  };

  useEffect(() => {
      if (messageSaved.length > 0) {
          Swal.fire({
              icon: 'success',
              title: 'Comentario agregado',
              showConfirmButton: false,
              timer: 1500 // Tiempo en milisegundos
          }).then(() => {
              setMessageSaved(''); // Limpia el estado del mensaje guardado después de mostrar
          });
      }
  }, [messageSaved]);

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
                  const { id, title, body, date, imageUrls, creatorDisplayName, creatorPhotoURL, comments } = note;
                  const dateString = format(new Date(date), "dd/MM/yyyy HH:mm:ss");

                  return (
                      <Grid
                          container
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          sx={{ mb: 3, backgroundColor: 'white', borderRadius: 2, padding: 2, width: '100%' }}
                          key={id}
                      >
                          <Grid container alignItems="center">
                              <Grid item>
                                  <Avatar alt={creatorDisplayName} src={creatorPhotoURL} />
                              </Grid>
                              <Grid item sx={{ ml: 2 }}>
                                  <Typography variant='subtitle1' fontWeight="bold">
                                      {creatorDisplayName}
                                  </Typography>
                              </Grid>
                          </Grid>

                          <Grid item sx={{ mt: 1 }}>
                              <Typography variant='h5' fontWeight="light" >
                                  {title}
                              </Typography>
                          </Grid>

                          <ImageGallery images={imageUrls} />

                          <Grid item sx={{ mt: 1 }}>
                              <Typography fontSize={12} fontWeight="light">
                                  {dateString}
                              </Typography>
                          </Grid>

                          <Grid item sx={{ mt: 1 }}>
                              <Typography fontSize={14} fontWeight="light">
                                  {body}
                              </Typography>
                          </Grid>

                          <Grid item sx={{ mt: 2, width: '100%' }}>
                              <TextField
                                  type="text"
                                  variant="filled"
                                  fullWidth
                                  multiline
                                  placeholder="Agrega un comentario"
                                  minRows={2}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                              />
                          </Grid>

                          <Grid item sx={{ mt: 1 }}>
                              <Button onClick={() => handleSaveComment(id)}>Enviar Comentario</Button>
                          </Grid>

                          {comments && comments.length > 0 && (
                              <Grid item sx={{ mt: 2, width: '100%' }}>
                                  <Typography variant='h6'>Comentarios:</Typography>
                                  {comments.map((comment, index) => (
                                      <Grid key={index} container direction="row" sx={{ mt: 1, alignItems: 'center' }}>
                                          <Avatar alt={comment.commentDisplayName} src={comment.commentPhotoURL} sx={{ mr: 2 }} />
                                          <Typography variant='body2' fontWeight="bold">{comment.commentDisplayName}</Typography>
                                          
                                          <Typography variant='body2'>  {comment.body}</Typography>
                                      </Grid>
                                  ))}
                              </Grid>
                          )}
                      </Grid>
                  );
              })
          ) : (
              <>
                  <Grid item xs={12}>
                      <StarOutline sx={{ fontSize: 100, color: 'white' }} />
                  </Grid>
                  <Grid item xs={12}>
                      <Typography color="white" variant='h5'>Selecciona o crea una nueva nota</Typography>
                  </Grid>
              </>
          )}
      </Grid>
  );
};
