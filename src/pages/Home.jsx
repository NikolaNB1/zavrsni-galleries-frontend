import { useContext, useEffect, useState } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import { getGalleries } from "../service/galleryService";
import GalleryRow from "../components/GalleryRow";

const Home = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);
  const [searchName, setSearchName] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    getGalleries({ page: 1 }).then(({ data }) => {
      updateGallery(data.data);
      setLastPage(data.last_page);
    });
  }, [updateGallery]);

  useEffect(() => {
    if (isFilterApplied) {
      setCurrentPage(1);
      setLoadMoreVisible(true);
    }
  }, [isFilterApplied]);

  const loadMoreGalleries = () => {
    if (currentPage < lastPage) {
      const nextPage = currentPage + 1;
      getGalleries({ page: nextPage }).then(({ data }) => {
        const newGalleries = [...galleries, ...data.data];
        updateGallery(newGalleries);
        setCurrentPage(nextPage);
        if (nextPage === lastPage) {
          setLoadMoreVisible(false);
        }
        if (isFilterApplied) {
          const filteredGalleries = newGalleries.filter((gallery) => {
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
          setFilteredGalleries(filteredGalleries);
        }
      });
    }
  };

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
            style={{ width: "300px" }}
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
        {galleries.length === 0 ? (
          <h1 className="container mt-5" style={{ width: "auto" }}>
            No galleries available.
          </h1>
        ) : isFilterApplied && filteredGalleries.length === 0 ? (
          <h1 className="container mt-5" style={{ width: "auto" }}>
            No content by filter.
          </h1>
        ) : (
          (isFilterApplied ? filteredGalleries : galleries)
            .slice(0, currentPage * 10)
            .map((gallery, id) => (
              <GalleryRow key={id} gallery={gallery} id={id} />
            ))
        )}
      </div>
      {loadMoreVisible && (
        <div className="d-flex justify-content-center m-3">
          <button className="btn btn-primary" onClick={loadMoreGalleries}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
