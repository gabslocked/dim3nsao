'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  let firebaseApp;
  try {
    // This is for Firebase App Hosting automatic configuration
    firebaseApp = initializeApp();
  } catch (e) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('Automatic Firebase initialization failed. Falling back to firebaseConfig object.', e);
    }
    // Fallback to the manual config object
    firebaseApp = initializeApp(firebaseConfig);
  }

  return getSdks(firebaseApp);
}
