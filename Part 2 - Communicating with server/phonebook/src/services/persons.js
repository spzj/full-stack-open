import axios from "axios";

const serverUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(serverUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(serverUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${serverUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (newObject) => {
  const request = axios.put(`${serverUrl}/${newObject.id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
