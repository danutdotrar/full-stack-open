import axios from "axios";

// Use the url made with the backend NodeJS and Express
const baseURL = "/api/blogs";

const getAll = () => {
    return axios.get(baseURL);
};

const create = (newObject) => {
    return axios.post(baseURL, newObject);
};

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject);
};

export default {
    getAll,
    create,
    update,
};
