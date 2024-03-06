import { getDocs, collection, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
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