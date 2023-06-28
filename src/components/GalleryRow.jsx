import { Link } from "react-router-dom";

const GalleryRow = ({ gallery, id }) => {
  const formattedDate = new Date(gallery.created_at).toLocaleString();

  return (
    <div
      key={id}
      className="col m-5"
      style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
    >
      <div className="card shadow-sm">
        <div className="card-body bg-light border rounded border">
          <img
            src={gallery.urls.split(",")[0]}
            className="card-img-top"
            alt={`${gallery.name}`}
            width="100"
            height="300"
          />
          <h3 className="card-text">{gallery.name}</h3>
          <p className="card-text mb-auto">
            Description: {gallery.description}
          </p>
          <div className="mb-1 text-body-secondary">
            Author: {gallery.user?.first_name} {gallery.user?.last_name}
          </div>
          <p className="card-text mb-auto">Release date: {formattedDate}</p>
          <div>
            <Link
              to={`/galleries/${gallery.id}`}
              className="btn btn-outline-success"
            >
              View gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GalleryRow;
