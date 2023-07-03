import { useContext, useState } from "react";
import { registerUser } from "../service/usersService";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { logInUser } = useContext(UserContext);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAccepted === true) {
      const { password, password_confirmation } = user;

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!/\d/.test(password)) {
        setError("Password must contain at least 1 number.");
        return;
      }

      if (password !== password_confirmation) {
        setError("Passwords do not match.");
        return;
      }

      registerUser(
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.password_confirmation
      )
        .then(({ data }) => {
          logInUser(data.user);
          localStorage.setItem("access_token", data.authorisation.token);
          localStorage.setItem("email", user.email);
          localStorage.setItem("password", user.password);
          setError("");
          setUser({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
          alert("Registration successful, welcome!");
          navigate("/");
        })
        .catch(() => {
          setError("Email already exists. Please choose another email.");
        });
    }
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleChecked = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                opacity: "90%",
              }}
            >
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/012/964/698/original/gallery-image-landscape-nature-photo-icon-over-various-background-glyph-style-design-designed-for-web-and-app-eps-10-illustration-free-vector.jpg"
                    alt="register form"
                    className="img-fluid"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      height: "-webkit-fill-available",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Register</span>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First name"
                          name="first_name"
                          onChange={handelInputChange}
                          value={user.first_name}
                          required
                        />
                        <label>First name</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          name="last_name"
                          onChange={handelInputChange}
                          value={user.last_name}
                          required
                        />
                        <label>Last name</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="name@example.com"
                          name="email"
                          onChange={handelInputChange}
                          value={user.email}
                          required
                        />
                        <label>Email address</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={handelInputChange}
                          value={user.password}
                          placeholder="Password"
                        />
                        <label>Password</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password confirmation"
                          name="password_confirmation"
                          onChange={handelInputChange}
                          value={user.password_confirmation}
                        />
                        <label>Confirm password</label>
                      </div>
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          checked={isAccepted}
                          onChange={handleChecked}
                          name="isAccepted"
                          value={isAccepted}
                          required
                        />
                        <label>Accept terms and conditions</label>
                      </div>

                      <div className="pt-1 mb-4 text-center">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center" style={{ color: "#393f81" }}>
                        Already have an account?
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Login here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
