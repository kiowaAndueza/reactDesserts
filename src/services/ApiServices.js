import axios from "axios";

const domain = "http://127.0.0.1:8000/api";
let request;
let url;

export const getAllDesserts = () => {
    request = "/desserts";
    url = domain + request;
    return axios.get(url);
}

export const createDessert = (formData, token) => {
  request = "/dessert";
  url = domain + request;
  return axios.post(url, formData, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};

export const deleteDessert = (id, token) => {
  request = "/desserts/" + id;
  url = domain + request;
  return axios.delete(url, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};
