import { ImageListItem, ImageList, Box } from '@mui/material';

export const ImageGallery = ({ images }) => {
  // Determinar el número de columnas según la cantidad de imágenes
  const numCols = images.length > 1 ? 2 : 1;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: numCols === 1 ? 'center' : 'flex-start', 
        width: '100%', 
        height: 'auto'
      }}
    >
      <ImageList sx={{ width: '100%', height: 'auto' }} cols={numCols} rowHeight={'auto'}>
        {images.map((image) => (
          <ImageListItem key={image} sx={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Imagen de la nota"
              loading="lazy"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
