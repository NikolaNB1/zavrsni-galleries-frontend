import { useContext, useEffect, useState } from "react";
import { getGalleries } from "../service/galleryService";
import GalleryRow from "../components/GalleryRow";
import GalleriesContext from "../storage/GalleriesContext";
import UserContext from "../storage/UserContext";

const MyGalleries = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);
  const { user } = useContext(UserContext);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    getGalleries().then(({ data }) => {
      const userGalleries = data.data.filter(
        (data) => data.user.id === user.id
      );
      updateGallery(userGalleries);
      setFilteredGalleries(userGalleries);
    });
  }, [updateGallery, user.id]);

  const handleFilter = (e) => {
    e.preventDefault();

    let filteredGalleries = [];

    if (searchParam) {
      filteredGalleries = galleries.filter((gallery) => {
        return (
          gallery.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.description.toLowerCase().includes(searchParam.toLowerCase())
        );
      });
    } else {
      filteredGalleries = galleries;
    }

    setFilteredGalleries(filteredGalleries);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="d-flex mt-3" onSubmit={handleFilter}>
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by name, or description..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">
            Filter
          </button>
        </form>
      </div>
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style={{ margin: "auto" }}
      >
        {Array.isArray(filteredGalleries) && filteredGalleries.length > 0 ? (
          filteredGalleries.map((gallery, id) => (
            <GalleryRow key={id} gallery={gallery} id={id} />
          ))
        ) : (
          <h2 className="container mt-5">You don't have galleries.</h2>
        )}
      </div>
    </div>
  );
};
export default MyGalleries;
