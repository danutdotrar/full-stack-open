import axios from "axios";

// Use the url made with the backend NodeJS and Express
const baseURL = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseURL, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    update,
    setToken,
};
