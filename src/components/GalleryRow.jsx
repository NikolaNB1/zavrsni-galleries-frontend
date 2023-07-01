import { Link } from "react-router-dom";

const GalleryRow = ({ gallery, id }) => {
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = JSON.parse(gallery.urls || "[]");
  const firstImageUrl = urls[0] || "";
  const description = gallery.description
    ? gallery.description.substring(0, 50) + "..."
    : "No description";

  return (
    <div
      key={id}
      className="col m-5"
      style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
    >
      <div className="card shadow-sm">
        <div>
          <h3>
            <Link
              to={`/galleries/${gallery.id}`}
              style={{ textDecoration: "none", color: "darkslategrey" }}
            >
              {gallery.name}
            </Link>
          </h3>

          <p className="card-text mb-auto"> {formattedDate}</p>
        </div>
        <img
          src={firstImageUrl}
          className="card-img-top"
          alt={`${gallery.name}`}
          width="100"
          height="300"
        />
        <p className="mb-1 text-body-secondary">
          <Link
            to={`/authors/${gallery.user?.id}`}
            style={{ textDecoration: "none", color: "darkslategrey" }}
          >
            Author: {gallery.user?.first_name} {gallery.user?.last_name}
          </Link>
        </p>
        <p className="card-text mb-auto">Description: {description}</p>
      </div>
    </div>
  );
};
export default GalleryRow;
