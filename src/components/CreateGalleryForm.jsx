import React, { useContext, useEffect, useState } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import UserContext from "../storage/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { editGalleryById, getGalleryById } from "../service/galleryService";

const CreateGalleryForm = () => {
  const { addGallery } = useContext(GalleriesContext);
  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [],
    user_id: user.id,
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
        setUrls(JSON.parse(data.urls));
      });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gallery.description.length > 1000) {
      setError("Description must be max 1000 characters long.");
      return;
    }

    if (gallery.name.length === 0) {
      setError("Name field is required.");
      return;
    }

    if (gallery.name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    if (gallery.urls.length === 0) {
      setError("Url field is required.");
      return;
    }

    if (Array.isArray(gallery.urls) && gallery.urls.some((url) => url === "")) {
      setError("Please fill in all URL fields or remove them.");
      return;
    }

    const imageExtensions = ["png", "jpg", "jpeg"];

    const urlValidationRegex = /^(http|https):\/\/[^ "]+$/;

    for (const url of gallery.urls) {
      if (!urlValidationRegex.test(url)) {
        setError("Please enter a valid URL.");
        return;
      }

      const fileExtension = url.split(".").pop().toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        setError(
          "Please enter a URL ending with a valid image extension (png, jpg, jpeg)."
        );
        return;
      }
    }
    if (id) {
      editGalleryById(id, gallery);
    } else {
      addGallery(gallery.name, gallery.description, gallery.urls, user.id);
      setError("");
      setGallery({
        name: "",
        description: "",
        urls: [],
        user_id: user.id,
      });
    }

    navigate("/");
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;

    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className=" d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div
            className="card w-75 container"
            style={{ opacity: "90%", padding: "20px" }}
          >
            <h5 className="text-center mb-4">Add new gallery</h5>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter gallery name"
                    value={gallery.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Description</label>
                  <textarea
                    className="mb-3 form-control"
                    rows="4"
                    cols="50"
                    name="description"
                    placeholder="Enter gallery description"
                    value={gallery.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                {Array.isArray(urls)
                  ? urls.map((url, index) => (
                      <div
                        className="form-group col-sm-6 flex-column d-flex"
                        key={index}
                      >
                        <label className="form-control-label px-3">Url</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter image url"
                          value={url}
                          onChange={(e) =>
                            handleUrlChange(index, e.target.value)
                          }
                          required
                          pattern=".*\.(png|jpg|jpeg)$"
                          title="Please enter a valid image URL ending with .png, .jpg, or .jpeg"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm mt-2 mb-2"
                            onClick={() => removeUrlField(index)}
                          >
                            Remove URL
                          </button>
                        )}
                      </div>
                    ))
                  : null}
                <div className="form-group col-sm-6">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addUrlField}
                  >
                    Add new URL
                  </button>
                </div>
              </div>
              <div className="row justify-content-end mt-3">
                <div className="form-group col-sm-6">
                  {!id ? (
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Add gallery
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-warning"
                      onClick={handleSubmit}
                    >
                      Edit gallery
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateGalleryForm;
