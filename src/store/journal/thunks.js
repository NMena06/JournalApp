import { collection, deleteDoc, doc, setDoc, addDoc, getDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, updateNote } from './';
import { deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNote, setSaving } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        const { uid, displayName, photoURL } = getState().auth;

        const newNote = {
            uid,
            title: '',
            body: '',
            imageUrls: [],
            comments: [],
            date: new Date().getTime(),
            creatorDisplayName: displayName,
            creatorPhotoURL: photoURL
        };

        const newDoc = doc(collection(FirebaseDB, 'notes'));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch) => {
        const notes = await loadNotes();
        dispatch(setNotes(notes));
    };
};

export const startSaveComment = (noteId, commentBody) => {
    return async (dispatch, getState) => {
        try {
            const { displayName, photoURL } = getState().auth;
            const newComment = {
                body: commentBody,
                commentDisplayName: displayName,
                commentPhotoURL: photoURL,
                date: new Date().getTime(),
            };

            const noteDocRef = doc(FirebaseDB, 'notes', noteId);
            const commentCollectionRef = collection(noteDocRef, 'comments');

            await addDoc(commentCollectionRef, newComment);

            // Obtener la nota actualizada después de añadir el comentario
            const noteSnapshot = await getDoc(noteDocRef);
            const updatedNote = { id: noteId, ...noteSnapshot.data() };

            dispatch(updateNote(updatedNote));
        } catch (error) {
            console.error('Error al guardar el comentario:', error);
        }
    };
};
export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid, displayName, photoURL } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = {
            ...note,
            creatorDisplayName: displayName,
            creatorPhotoURL: photoURL
        };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    };
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileArray = Array.from(files);
        const fileUploadPromises = fileArray.map(file => fileUpload(file));
        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    };
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    };
};

export const addCommentToNote = (state, action) => {
    const { noteId, comment } = action.payload;

    state.notes = state.notes.map(note => {
        if (note.id === noteId) {
            return {
                ...note,
                comments: [...note.comments, comment]
            };
        }
        return note;
    });
};

export const updateProfilePhoto = async (userId, photoURL) => {
    const userDocRef = doc(FirebaseDB, 'users', userId);
    await updateDoc(userDocRef, { photoURL });
};
