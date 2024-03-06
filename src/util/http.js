import { getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase';

export const getEvents = async () => {
  try {
    const collectionRef = collection(db, 'events');
    const response = await getDocs(collectionRef);
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