import { collection, getDocs, query, where, getDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async () => {
    const notesRef = collection(FirebaseDB, 'notes');
    const snapshot = await getDocs(notesRef);
    const notes = [];

    for (const doc of snapshot.docs) {
        const noteData = doc.data();
        const note = {
            id: doc.id,
            ...noteData,
            comments: [] // Inicializamos la lista de comentarios
        };

        // Consultamos los comentarios de la nota actual
        const commentsRef = collection(doc.ref, 'comments');
        const commentsSnapshot = await getDocs(commentsRef);

        commentsSnapshot.forEach(commentDoc => {
            note.comments.push({
                id: commentDoc.id,
                ...commentDoc.data()
            });
        });

        notes.push(note);
    }

    return notes;
};
