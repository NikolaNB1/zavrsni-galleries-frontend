import { useEffect, useState } from "react";
import { getGalleries, postGallery } from "../service/galleryService";
import GalleriesContext from "./GalleriesContext";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  useEffect(() => {
    getGalleries().then(({ data }) => setGalleryState(data));
  }, []);

  const postNewGallery = (name, description, urls) => {
    postGallery(name, description, urls)
      .then(({ data }) => {
        setGalleryState((prevState) => [...prevState, data]);
      })
      .catch((error) => {
        console.error("Error occurred while adding gallery:", error);
      });
  };

  const GalleryContext = {
    galleries: galleryState,
    updateGallery: setGalleryState,
    addGallery: postNewGallery,
  };

  return (
    <GalleriesContext.Provider value={GalleryContext}>
      {children}
    </GalleriesContext.Provider>
  );
};

export default GalleryProvider;
