import { useEffect, useState } from "react";
import { getUsers } from "../service/usersService";

const Comments = ({ comments, user, handleDeleteComm, loggedIn }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data.users);
    });
  }, []);
  return (
    <div>
      <h2>Comments ({comments?.length})</h2>
      {comments?.map((comment, index) => (
        <div key={index} className="comment">
          <div
            className="container mt-4"
            style={{
              width: "500px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex justify-content-between">
              <p>No of comment: {index + 1}</p>
              <p>{new Date(comment.created_at).toLocaleString()}</p>
            </div>
            <textarea
              disabled
              rows="3"
              cols="10"
              style={{ width: "100%", borderRadius: "5px" }}
              value={comment.description}
            ></textarea>
            {loggedIn && user.id === comment.user_id ? (
              <div className="d-flex justify-content-between">
                <p>
                  Comment author:{" "}
                  {users.find((user) => user.id === comment.user_id).first_name}{" "}
                  {users.find((user) => user.id === comment.user_id).last_name}
                </p>
                <button
                  className="btn btn-danger "
                  type="delete"
                  onClick={() => handleDeleteComm(comment.id)}
                >
                  Delete Comment
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Comments;
