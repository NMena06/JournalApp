// helpers.js
import imageCompression from 'browser-image-compression';

export const fileUpload = async (file) => {
    if (!file) throw new Error('No tenemos ningún archivo a subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dgftdqcun/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    // Comprimir la imagen antes de subirla
    const options = {
        maxSizeMB: 1,          // Tamaño máximo en MB
        maxWidthOrHeight: 1920, // Máximo ancho o altura permitida
        useWebWorker: true     // Usar worker para mejorar la compresión
    };

    try {
        const compressedFile = await imageCompression(file, options);
        formData.append('file', compressedFile);

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir la imagen');
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
