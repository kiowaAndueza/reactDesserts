import axios from "axios";

const domain = "http://127.0.0.1:8000";
let request;
let url;



export const information = (token) => {
    request = "/information";
    url = domain + request;
    return axios.get(url, {
      headers: {
        "X-AUTH-TOKEN": token,
      },
    });  
}