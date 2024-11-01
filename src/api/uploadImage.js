// CreatePostScreen.js
import {storage} from "../../firebaseConfig";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export const uploadImage = async (imageObj) => {
  if (!imageObj || !imageObj.assets || imageObj.assets.length === 0) {
    console.error("image object or assets is missing.");
    return null;
  }

  try {
    const imageAsset = imageObj.assets[0]; // Assuming you are uploading the first asset
    const uri = imageAsset.uri;

    // Convert URI to blob format
    const response = await fetch(uri);
    const blob = await response.blob();

    // Use the filename from the image object or generate a new one
    const filename =
      imageAsset.fileName || uri.substring(uri.lastIndexOf("/") + 1);

    // Create a reference to Firebase Storage
    const storageRef = ref(storage, `images/${filename}`);

    // Upload the image
    const snapshot = await uploadBytes(storageRef, blob);

    // Get the download URL once the image is uploaded
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
