import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { StartupIdea } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';

const COLLECTION_NAME = 'startups';

export const saveStartupIdea = async (startup: Omit<StartupIdea, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), startup);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    return '';
  }
};

export const getStartupsByUser = async (userId: string): Promise<StartupIdea[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StartupIdea));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    return [];
  }
};

export const subscribeToStartups = (userId: string, callback: (startups: StartupIdea[]) => void) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const startups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StartupIdea));
    callback(startups);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  });
};

export const updateStartup = async (id: string, data: Partial<StartupIdea>) => {
  const path = `${COLLECTION_NAME}/${id}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const getStartupData = async (userId: string): Promise<StartupIdea | null> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as StartupIdea;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    return null;
  }
};

export const deleteStartup = async (id: string) => {
  const path = `${COLLECTION_NAME}/${id}`;
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};
