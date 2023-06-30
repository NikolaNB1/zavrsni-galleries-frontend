import { useContext, useEffect } from "react";
import { getGalleries } from "../service/galleryService";
import GalleryRow from "../components/GalleryRow";
import GalleriesContext from "../storage/GalleriesContext";
import UserContext from "../storage/UserContext";

const MyGalleries = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      const userGalleries = data.data.filter(
        (data) => data.user.id === user.user.id
      );
      updateGallery(userGalleries);
    });
  }, [updateGallery, user.user.id]);

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
          <p className="container mt-5">No content to show.</p>
        )}
      </div>
    </div>
  );
};
export default MyGalleries;