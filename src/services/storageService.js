// src/services/storageService.js
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadProfilePicture = async (file) => {
  try {
    const fileRef = ref(storage, `profile_pictures/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem de perfil:', error);
    throw error;
  }
};

export default {
  uploadProfilePicture,
};
