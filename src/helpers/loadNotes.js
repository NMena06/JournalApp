import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async () => {
    const notesRef = collection(FirebaseDB, 'notes');
    const snapshot = await getDocs(notesRef);
    const notes = [];

    snapshot.forEach(doc => {
        const noteData = doc.data();
        notes.push({
            id: doc.id,
            ...noteData,
            comments: [] // Inicializamos la lista de comentarios
        });
    });

    return notes;
};

export const loadComments = async (noteId) => {
    const noteRef = collection(FirebaseDB, `notes/${noteId}/comments`);
    const commentsSnapshot = await getDocs(noteRef);
    const comments = [];

    commentsSnapshot.forEach(commentDoc => {
        comments.push({
            id: commentDoc.id,
            ...commentDoc.data()
        });
    });

    return comments;
};
