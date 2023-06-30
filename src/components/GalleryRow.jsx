import { Link } from "react-router-dom";

const GalleryRow = ({ gallery, id }) => {
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = JSON.parse(gallery.urls || "[]");
  const firstImageUrl = urls[0] || "";
  const description = gallery.description.substring(0, 50) + "...";

  return (
    <div
      key={id}
      className="col m-5"
      style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
    >
      <div className="card shadow-sm">
        <div className="card-body bg-light border rounded border">
          <img
            src={firstImageUrl}
            className="card-img-top"
            alt={`${gallery.name}`}
            width="100"
            height="300"
          />
          <h3 className="card-text">
            <Link to={`/galleries/${gallery.id}`}>{gallery.name}</Link>
          </h3>
          <p className="card-text mb-auto">Description: {description}</p>
          <div className="mb-1 text-body-secondary">
            <Link to={`/authors/${gallery.user?.id}`}>
              Author: {gallery.user?.first_name} {gallery.user?.last_name}
            </Link>
          </div>
          <p className="card-text mb-auto">Release date: {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};
export default GalleryRow;
