import React, { useContext, useState } from "react";
import GalleriesContext from "../storage/GalleriesContext";

const CreateGalleryForm = () => {
  const { addGallery } = useContext(GalleriesContext);
  const [urls, setUrls] = useState([""]);

  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(gallery);
    addGallery(gallery.name, gallery.description, gallery.urls);
    setGallery({
      name: "",
      description: "",
      urls: [],
    });
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
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter gallery name"
                    required
                    // value={animal.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Description</label>
                  <textarea
                    className="mb-3 form-control"
                    rows="4"
                    cols="50"
                    name="type"
                    placeholder="Enter gallery description"
                    // value={animal.type}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="row justify-content-between text-left">
                {urls.map((url, index) => (
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
                      onChange={(e) => handleUrlChange(index, e.target.value)}
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
                ))}
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Add gallery
                  </button>
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
