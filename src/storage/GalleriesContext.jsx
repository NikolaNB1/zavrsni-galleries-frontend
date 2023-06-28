import { createContext } from "react";

const GalleriesContext = createContext({
  galleries: [],
  updateGallery: () => {},
  addGallery: () => {},
});

export default GalleriesContext;
