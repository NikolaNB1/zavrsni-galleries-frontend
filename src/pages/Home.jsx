import { useContext, useEffect } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import { getGalleries } from "../service/galleryService";
import GalleryRow from "../components/GalleryRow";

const Home = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      updateGallery(data.data);
    });
  }, [updateGallery]);

  return (
    <div>
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style={{ margin: "auto" }}
      >
        {Array.isArray(galleries) && galleries.length > 0 ? (
          galleries.map((gallery, id) => (
            <GalleryRow key={id} gallery={gallery} id={id} />
          ))
        ) : (
          <h1 className="container mt-5">No content to show.</h1>
        )}
      </div>
    </div>
  );
};
export default Home;
