import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async () => {
    const notesRef = collection(FirebaseDB, 'notes');
    const snapshot = await getDocs(notesRef);
    const notes = [];

    for (const doc of snapshot.docs) {
        const noteData = doc.data();
        const commentsSnapshot = await getDocs(collection(doc.ref, 'comments'));

        const comments = [];
        commentsSnapshot.forEach(commentDoc => {
            comments.push({
                id: commentDoc.id,
                ...commentDoc.data()
            });
        });

        const note = {
            id: doc.id,
            ...noteData,
            comments: comments
        };

        notes.push(note);
    }

    return notes;
};
