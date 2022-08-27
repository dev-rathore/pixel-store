import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  getDocs,
  writeBatch,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

// App's Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSjYLR7eSZCPfPfkRxNPUzT7O7wkKZDk0",
  authDomain: "pixel-store-db.firebaseapp.com",
  projectId: "pixel-store-db",
  storageBucket: "pixel-store-db.appspot.com",
  messagingSenderId: "409426944259",
  appId: "1:409426944259:web:1871ce8781c0fe12af8936",
};

// Established a Connection
const firebaseApp = initializeApp(firebaseConfig);

/* We might have different provider instances doing different things. */
const googleProvider = new GoogleAuthProvider(); // This is a class.

/* With this setCustomParameters, we can tell different ways that we want this
Google Auth Provider to behave. */
googleProvider.setCustomParameters({
  prompt: "select_account",
  /* This select_account means that every time somebody interacts with our
  google provider, we want to always force them to select an account. */
});

/* This auth is the only way we can keep track of whether or not users are
properly authenticating or not */
export const auth = getAuth();
/* currentUser gets null if no user is authenticated. If a user is authenticated then currentUser stores that user's data */

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Established a Connection to Firestore Database
export const db = getFirestore(firebaseApp);

// This function was used to add Collection and documents using JS File
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // getDocs() is used to refer all the documents of a specific collection
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    // docSnapshot.data() fetch the existing data/fields in each document
    // docSnapshot.id fetch the id
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const getUserCartItems = async (userAuth) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnapshot = await getDoc(docRef);
  const userCartItems = await docSnapshot.data().cartItems;
  return userCartItems;
};

export const addToUserCart = async (userAuth, productToAdd) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnapshot = await getDoc(docRef);
  const userCartItems = await docSnapshot.data().cartItems;

  const existingCartItem = userCartItems.find(
    (userCartItem) => userCartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    const cartItems = userCartItems.map((userCartItem) =>
      userCartItem.id === productToAdd.id
        ? { ...userCartItem, quantity: userCartItem.quantity + 1 }
        : userCartItem
    );
    await updateDoc(docRef, { cartItems });
    return cartItems;
  } else {
    const cartItems = [...userCartItems, { ...productToAdd, quantity: 1 }];
    await updateDoc(docRef, { cartItems });
    return cartItems;
  }
};

export const removeFromUserCart = async (userAuth, cartItemToRemove) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnapshot = await getDoc(docRef);
  const userCartItems = await docSnapshot.data().cartItems;

  // find the cart item to remove
  const existingCartItem = userCartItems.find(
    (userCartItem) => userCartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    const cartItems = userCartItems.filter(
      (userCartItem) => userCartItem.id !== cartItemToRemove.id
    );
    await updateDoc(docRef, { cartItems });
    return cartItems;
  } else {
    // return back cartitems with matching cart item with reduced quantity
    const cartItems = userCartItems.map((userCartItem) =>
      userCartItem.id === cartItemToRemove.id
        ? { ...userCartItem, quantity: userCartItem.quantity - 1 }
        : userCartItem
    );
    await updateDoc(docRef, { cartItems });
    return cartItems;
  }
};

export const clearFromUserCart = async (userAuth, cartItemToClear) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnapshot = await getDoc(docRef);
  const userCartItems = await docSnapshot.data().cartItems;

  const cartItems = userCartItems.filter(
    (userCartItem) => userCartItem.id !== cartItemToClear.id
  );
  await updateDoc(docRef, { cartItems });
  return cartItems;
};

export const emptyUserCart = async (userAuth) => {
  const docRef = doc(db, "users", userAuth.uid);
  const cartItems = [];

  await updateDoc(docRef, { cartItems });
};

// Adding new order to orders collection
export const addOrderToOrdersCollection = async (
  additionalInformation = {}
) => {
  const collectionRef = collection(db, "orders");
  try {
    const placedOn = new Date();
    const docRef = await addDoc(collectionRef, {
      placedOn,
      ...additionalInformation,
    });
  } catch (error) {
    console.log("error creating the order", error.message);
  }

  return getOrdersAndDocuments();
};

// Orders Collection
export const getOrdersAndDocuments = async () => {
  const collectionRef = collection(db, "orders");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const orderMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // console.log(docSnapshot.id);
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;
  }, {});

  return orderMap;
};

export const updateStatus = async (orderId, orderStatus) => {
  const docRef = doc(db, "orders", orderId);
  // const docSnapshot = await getDoc(docRef);
  // const order = await docSnapshot.data();

  await updateDoc(docRef, { orderStatus });
  return getOrdersAndDocuments();
};

// Creating user document from Google Sign In if user doesn't exist.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // doc() is used to refer a specific document
  const userDocRef = doc(db, "users", userAuth.uid);

  // getDoc() is used to get a specific document
  const userSnapshot = await getDoc(userDocRef);

  // If user data doesn't exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // setDoc sets the data/fields of a specific document within a collection
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        role: "user",
        cartItems: [],
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // If user data exists
  return userSnapshot;
};

// Helper Function
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Helper Function
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
