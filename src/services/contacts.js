import axios from "axios";

const baseUrl = "/api/contacts";

const getAll = () => axios.get(baseUrl).then((r) => r.data);

const post = (newObject) => axios.post(baseUrl, newObject).then((r) => r.data);

const put = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((r) => r.data);

const del = (id) => axios.delete(`${baseUrl}/${id}`);

const contactService = { getAll, post, put, del };

export default contactService;
