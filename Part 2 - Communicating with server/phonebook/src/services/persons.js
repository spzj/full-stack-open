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

export default { getAll, create };
