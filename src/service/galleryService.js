import { API } from "../shared/api";

export const getGalleries = () => {
  return API.get(`/galleries`);
};
export const postGallery = (name, description, urls, author_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    author_id,
  });
};
