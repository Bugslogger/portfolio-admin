// firebase
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { app } from './init';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();
const db = getFirestore(app);

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
