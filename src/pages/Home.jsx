import { useContext, useEffect, useState } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import { getGalleries } from "../service/galleryService";
import GalleryRow from "../components/GalleryRow";

const Home = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);
  const [searchName, setSearchName] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      updateGallery(data.data);
    });
  }, [updateGallery]);

  const handleFilter = (e) => {
    e.preventDefault();

    let filteredGalleries = [];

    if (searchName) {
      filteredGalleries = galleries.filter((gallery) => {
        return (
          gallery.name.toLowerCase().includes(searchName.toLowerCase()) ||
          gallery.description
            .toLowerCase()
            .includes(searchName.toLowerCase()) ||
          gallery.user.first_name
            .toLowerCase()
            .includes(searchName.toLowerCase()) ||
          gallery.user.last_name
            .toLowerCase()
            .includes(searchName.toLowerCase())
        );
      });
    } else {
      filteredGalleries = galleries;
    }

    setFilteredGalleries(filteredGalleries);
    setIsFilterApplied(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="d-flex mt-3" onSubmit={handleFilter}>
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by name, author, or description..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
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
        {isFilterApplied && filteredGalleries.length === 0 ? (
          <h1 className="container mt-5">No content by filter.</h1>
        ) : (
          (filteredGalleries.length > 0 ? filteredGalleries : galleries).map(
            (gallery, id) => <GalleryRow key={id} gallery={gallery} id={id} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
