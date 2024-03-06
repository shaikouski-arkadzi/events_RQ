import { QueryClient } from '@tanstack/react-query';
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';

export const queryClient = new QueryClient();

export const getEvents = async (searchTitle = '') => {
  try {
    let collectionRef = collection(db, 'events');
    let q;
    if(searchTitle.length > 0) {
      q = query(collectionRef, where('title', '==', searchTitle))
    }
    const response = await getDocs(searchTitle.length > 0 ? q : collectionRef);
    const filteredData = await Promise.all(response.docs.map(async doc => ({
      ...doc.data(),
      image: await getDownloadURL(ref(storage, doc.data().image)),
      id: doc.id
    })));
    return filteredData;
  } catch (err) {
    throw JSON.parse(JSON.stringify(err));
  }
}

export const createNewEvent = async ({ file, ...anotherEventData }) => {
  try {
    const fileRef = ref(storage, `events/${file?.name}`);
    const uploadFile = await uploadBytes(fileRef, file);
    const collectionRef = collection(db, 'events');
    const newData = {...anotherEventData, image: uploadFile.metadata.fullPath};
    await addDoc(collectionRef, newData);
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }

  return event;
}