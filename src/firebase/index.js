// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
    apiKey: 'AIzaSyDM5L_pWM5aFORewNPg1H0iJPk5g4N0hhs',
    authDomain: 'manager-project-3bc13.firebaseapp.com',
    projectId: 'manager-project-3bc13',
    storageBucket: 'manager-project-3bc13.appspot.com',
    messagingSenderId: '1054585210300',
    appId: '1:1054585210300:web:bec4b96440c3bec87757b9',
    measurementId: 'G-WMEQEHLJTF',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const storage = getStorage(app);

export async function uploadImage(file) {
    if (file) {
        console.log(file);
        try {
            const name = +new Date() + '-' + file.name;
            const fileRefPhoto = ref(storage, `${name}-${uuid()}`);
            const snapshotPhoto = await uploadBytes(fileRefPhoto, file);
            const photoUrl = await getDownloadURL(snapshotPhoto.ref);
            return photoUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
}

export function logOut() {
    signOut(auth);
}
