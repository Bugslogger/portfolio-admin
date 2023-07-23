// firebase
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { app } from './init';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getApp } from 'firebase/app';

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(getApp(), 'gs://portfolio-cad0e.appspot.com');
/**
 *  get all data from firebase with collection name
 *
 * @param {String} collectionName
 * @returns
 */

export const GetDataFromFirebase = (collectionName) => {
  if (!collectionName) throw new Error('no parameter is passed');
  const data = getDocs(collection(db, collectionName));
  return data;
};

/**
 *  get data from firebase with collection name
 *
 * @param {String} collectionName
 * @param {String} id
 * @returns
 */

export const SingleDataFromFirebase = async (collectionName, id) => {
  if (!collectionName) throw new Error('no parameter is passed');
  const data = await getDoc(doc(db, collectionName, id));
  return data;
};

/**
 * add data to firebase collectionn with given collection name
 *
 * @param {String} collectionName
 * @param {Object} body
 * @returns
 */
export const AddDataToFirebase = (collectionName, body) => {
  if (!collectionName || !body) {
    throw new Error('Please Invalid or empty parameters to function');
  }
  const data = addDoc(collection(db, collectionName), body);
  return data;
};

/**
 *
 * @param {String} collectionName
 * @param {String} collectionKeyName
 * @param {object} updateBody
 * @returns
 */

export const updateDataToFirebase = (collectionName, collectionKeyName, updateBody) => {
  if (!collectionKeyName || !collectionName || !updateBody) {
    throw new Error('Invalid function parameters');
  }
  const data = updateDoc(doc(db, collectionName, collectionKeyName), updateBody);
  return data;
};

/**
 *
 * @param {String} collectionName
 * @param {String} collectionKeyName
 * @returns
 */
export const DeleteDataFromFirebase = (collectionName, collectionKeyName) => {
  console.log(collectionName, collectionKeyName);
  // return db.collection(collectionName).doc(collectionKeyName).delete();
  if (!collectionKeyName || !collectionName) {
    throw new Error('Invalid function parameters');
  }
  const data = deleteDoc(doc(db, collectionName, collectionKeyName));
  return data;
};

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns
 */
export async function LoginUser(email, password) {
  // let's add some validation
  if (!email) throw new Error('Email can not be empty');
  if (!password) throw new Error('Password can not be Empty');

  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

/**
 *
 * @param {Function} callback
 */
export const IsUserLogged = (callback) => {
  onAuthStateChanged(auth, callback);
};

/**
 *
 * @param {Function} callback
 */
export const LogOut = (callback) => {
  signOut(auth, callback);
};

/* eslint-disable */
// files upload
/**
 *
 * @param {String} file
 * @returns
 */
export const uploadFiles = async (file) => {
  const mountainsRef = ref(storage, `files`);
  const res = await uploadBytes(mountainsRef, file);
  debugger;
  console.log(res);
  return mountainsRef;
};

export const DownloadImage = async () => {
  getDownloadURL(ref(storage, 'files'))
    .then(async (url) => {
      // `url` is the download URL for 'images/stars.jpg'

      const res = await XhrApiCall('GET', url);
      console.log(res);

      console.log(res);

      const href = URL.createObjectURL(res);
      // Or inserted into an <img> element
      // debugger;
      console.log(href);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
};

/**
 *
 * @param {['GET','POST']} method
 * @param {*} url
 * @param {*} body
 * @param {*} header
 * @returns
 */
const XhrApiCall = (method, url, body, header) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.responseType = 'blob';

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('accept', '*/*');
      xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
      xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');

      if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('accept', '*/*');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
        if (header) {
          xhr.setRequestHeader(header.value, header.content);
        }
      }

      xhr.onerror = () => {
        reject(`Error is thrown from XMLHttpRequest due to ${method} Method not able to work due to some reason`);
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.send(JSON.stringify(body));
    } catch (error) {
      return reject(error);
    }
  });
};
