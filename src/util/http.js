import { getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';

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

export const createNewEvent = async (eventData) => {
  console.log(eventData);
  try {
    const fileRef = ref(storage, `events/${eventData.image?.name}`);
    console.log(fileRef);
    const uploadFile = await uploadBytes(fileRef, eventData.image);
    console.log(uploadFile);
    const collectionRef = collection(db, 'events');
    const newData = {...eventData, image: uploadFile.metadata.fullPath};
    await addDoc(collectionRef, newData);
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }

  return event;
}