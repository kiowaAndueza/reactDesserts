import axios from "axios";

const domain = "http://127.0.0.1:8000";
let request;
let url;


/******************LIST REQUEST************************/
export const createList = (formData, token) => {
  request = "/list";
  url = domain + request;
  return axios.post(url, formData, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};

export const deleteList = (id, token) => {
  request = "/lists/" + id;
  url = domain + request;
  return axios.delete(url, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  }); 
}

export const getList = (token) => {
  request = "/lists";
  url = domain + request;
  return axios.get(url, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });  
}

/******************DESSERT USER REQUEST************************/
export const getDesserts = (token, idList) => {
  request = "/list/dessertsUser/" + idList;
  url = domain + request;
  return axios.get(url, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });  
}

export const deleteDessert = (id, token) => {
  request = "/list/remove/" + id;
  url = domain + request;
  return axios.delete(url, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
}


export const createDessert = (formData, token) => {
  request = "/list/dessertsUser";
  url = domain + request;
  return axios.post(url, formData, {
    headers: {
      "X-AUTH-TOKEN": token,
    },
  });
};


