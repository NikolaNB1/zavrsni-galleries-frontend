import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalleryById } from "../service/galleryService";
import Carousel from "react-bootstrap/Carousel";

const ViewGallery = () => {
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = gallery.urls?.split(",") || [];

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
    }
  }, [id]);

  return (
    <div>
      <div
        className="row row-cols-1 justify-content-center"
        style={{ margin: "auto" }}
      >
        <div
          className="col m-5"
          style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
        >
          <div className="card shadow-sm">
            <div className="card-body bg-light border rounded border">
              <h3 className="card-text">{gallery.name}</h3>
              <div className="mb-1 text-body-secondary">
                Author: {gallery.user?.first_name} {gallery.user?.last_name}
              </div>
              <p className="card-text mb-auto">Release date: {formattedDate}</p>
              <p className="card-text mb-auto">
                Description: {gallery.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row row-cols-1 justify-content-center"
        style={{ margin: "auto", width: "400px" }}
      >
        <Carousel>
          {urls.map((url, index) => (
            <Carousel.Item key={index}>
              <a href={url.trim()} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-100"
                  src={url.trim()}
                  alt={`Slide ${index}`}
                  width="300"
                  height="300"
                />
              </a>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default ViewGallery;
