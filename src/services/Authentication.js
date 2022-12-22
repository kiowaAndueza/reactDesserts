import axios from "axios";

const domain = "http://127.0.0.1:8000";
let request;
let url;

export const login = (email, password) => {
    request = "/login";
    url = domain + request;
    return  axios
    .post(url, {
      email: email,
      password: password,
    });
}

export const register = (formData) => {
    request = "/register";
    url = domain + request;
    return axios.post(url, formData);
}