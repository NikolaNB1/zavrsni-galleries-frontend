const Comments = ({ comments, user, handleDeleteComm, loggedIn }) => {
  return (
    <div
      className="container border mt-5"
      style={{ width: "700px", paddingBottom: "50px" }}
    >
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
          {loggedIn && user.id === comment.user_id ? (
            <button
              className="btn btn-outline-danger"
              type="delete"
              onClick={() => handleDeleteComm(comment.id)}
            >
              Delete Comment
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default Comments;
