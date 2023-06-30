import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteCommentById, getGalleryById } from "../service/galleryService";
import Carousel from "react-bootstrap/Carousel";
import AddComment from "../components/AddComment";
import UserContext from "../storage/UserContext";

const ViewGallery = () => {
  const { loggedIn, user } = useContext(UserContext);
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const urls = gallery.urls?.split(",") || [];

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
        setComments(data.comments);
      });
    }
  }, [id, setComments]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete comment?"
    );
    if (shouldDelete) {
      deleteCommentById(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    }
  };

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
      {loggedIn ? (
        <AddComment galleryId={id} setComments={setComments} />
      ) : null}
      <div className="container border mt-5" style={{ width: "700px" }}>
        <h2>Comments ({comments?.length})</h2>
        {comments?.map((comment, index) => (
          <div key={comment.id} className="comment">
            <div className="d-flex justify-content-between">
              <p>No of comment: {index + 1}</p>
              <p>Author: {comment.user_id}</p>
              <p>{new Date(comment.created_at).toLocaleString()}</p>
            </div>
            <p></p>
            <textarea
              disabled
              rows="3"
              cols="10"
              style={{ width: "100%" }}
              value={comment.description}
            ></textarea>
            {loggedIn && user.user.id === comment.user_id ? (
              <button
                className="btn btn-outline-danger"
                type="delete"
                onClick={() => handleDelete(comment.id)}
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewGallery;
