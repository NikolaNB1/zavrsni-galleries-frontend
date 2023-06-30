import { useContext, useState } from "react";
import { addComment } from "../service/galleryService";
import UserContext from "../storage/UserContext";

const AddComment = ({ galleryId, setComments }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState({
    description: "",
    gallery_id: galleryId,
    user_id: user.user.id,
  });

  const resetInput = () => {
    setComment({
      description: "",
      gallery_id: galleryId,
      user_id: user.user.id,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = (event, comment) => {
    event.preventDefault();

    addComment(comment.description, galleryId, user.user.id);

    setComments((prevState) => [
      ...prevState,
      {
        description: comment.description,
        gallery_id: galleryId,
        user_id: user.user.id,
      },
    ]);

    resetInput();
  };

  return (
    <>
      <form
        style={{ width: "500px" }}
        className="container mt-5"
        onSubmit={(event) => handleAdd(event, comment)}
      >
        <div className="mb-3">
          <label className="form-label">Enter your comment</label>
          <textarea
            onChange={handleInputChange}
            value={comment.description}
            placeholder="Add comment..."
            className="form-control"
            name="description"
          >
            {user.user.first_name} {user.user.last_name}
          </textarea>
          <input type="hidden" />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!comment.description}
          >
            Post comment
          </button>
        </div>
      </form>
    </>
  );
};
export default AddComment;
