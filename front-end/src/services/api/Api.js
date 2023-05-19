import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDViYjg5ZjY2Y2U3ZjU2YTJjZjA1Y2UiLCJwZXJtaXNzYW8iOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjgzODIxMjI0LCJleHAiOjE2ODM5MDc2MjR9.xWC2SE74-fGmS7KM8eLNYk80s8-D_T266bgOza0s1wY",
    },
  });
};

export default Api;
