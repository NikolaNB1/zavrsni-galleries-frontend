import { API } from "../shared/api";

export const getGalleries = () => {
  return API.get(`/galleries`);
};
export const postGallery = (name, description, urls, user_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    user_id,
  });
};
export const getGalleryById = (id) => {
  return API.get(`/galleries/${id}`);
};
export const addComment = (description, gallery_id, user_id) => {
  return API.post(`/galleries/${gallery_id}/comments`, {
    description,
    gallery_id,
    user_id,
  });
};
