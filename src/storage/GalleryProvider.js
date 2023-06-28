import { useState } from "react";
import { postGallery } from "../service/galleryService";
import GalleriesContext from "./GalleriesContext";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  const postNewGallery = (name, description, urls, user_id) => {
    postGallery(name, description, urls, user_id)
      .then(({ data }) => {
        setGalleryState((prevState) => [...prevState, data]);
      })
      .catch((error) => {
        console.error("Error occurred while adding gallery:", error);
      });
  };

  const galleryContext = {
    galleries: galleryState,
    updateGallery: setGalleryState,
    addGallery: postNewGallery,
  };

  return (
    <GalleriesContext.Provider value={galleryContext}>
      {children}
    </GalleriesContext.Provider>
  );
};

export default GalleryProvider;
