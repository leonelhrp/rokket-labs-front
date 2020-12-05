import http from "../http-common";

const getAll = () => {
  return http.get("/animals");
};

const get = id => {
  return http.get(`/animals/${id}`);
};

const create = data => {
  return http.post("/animals", data);
};

const update = (id, data) => {
  return http.put(`/animals/${id}`, data);
};

const remove = id => {
  return http.delete(`/animals/${id}`);
};

const removeAll = () => {
  return http.delete(`/animals`);
};

const findByName = name => {
  return http.get(`/animals?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};
