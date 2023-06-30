import { API } from "../shared/api";

export const getGalleries = (params) => {
  return API.get(`/galleries`, { params });
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
export const deleteCommentById = (id) => {
  return API.delete(`/comments/${id}`);
};
export const editGalleryById = (id, gallery) => {
  return API.put(`/galleries/${id}`, gallery);
};
export const deleteGalleryById = (id) => {
  return API.delete(`/galleries/${id}`);
};
