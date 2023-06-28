import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDljNjgyYjdkMTNjNThjOGIxYTI1OGIiLCJhZG1pbmlzdHJhZG9yIjp0cnVlLCJpYXQiOjE2ODc5NzE5ODIsImV4cCI6MTY5MDU2Mzk4Mn0.EDCAyr2bW81WaoQLrfdHCoiAoeFBuNfZ2xu_KTeN5jA",
    },
  });
};

export default Api;
