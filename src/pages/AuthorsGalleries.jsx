import { useEffect, useState } from "react";
import { getUserGalleries, getUserById } from "../service/usersService";
import { Link, useParams } from "react-router-dom";

const AuthorsGalleries = () => {
  const { id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (id) {
      getUserGalleries(id).then(({ data }) => {
        setGalleries(data.galleries);
        getUserById(id).then(({ data }) => {
          setAuthor(data.user);
        });
      });
    }
  }, [id]);

  return (
    <div>
      {author && (
        <h1>
          Author: {author.first_name} {author.last_name}
        </h1>
      )}
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style={{ margin: "auto" }}
      >
        {Array.isArray(galleries) && galleries.length > 0 ? (
          galleries.map((gallery, id) => (
            <div
              key={id}
              className="col m-5"
              style={{ width: "380px", borderRadius: "5px", opacity: "90%" }}
            >
              <div className="card shadow-sm">
                <div className="card-body bg-light border rounded border">
                  <img
                    src={JSON.parse(gallery.urls || "[]")[0]}
                    className="card-img-top"
                    alt={`${gallery.name}`}
                    width="100"
                    height="300"
                  />
                  <h3 className="card-text">
                    <Link to={`/galleries/${gallery.id}`}>{gallery.name}</Link>
                  </h3>
                  <p className="card-text mb-auto">
                    Description: {gallery.description.substring(0, 50) + "..."}
                  </p>
                  <p className="card-text mb-auto">
                    Release date:{" "}
                    {new Date(gallery.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="container mt-5">No content to show.</h1>
        )}
      </div>
    </div>
  );
};
export default AuthorsGalleries;
