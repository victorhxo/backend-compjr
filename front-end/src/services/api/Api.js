import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDViYjg5ZjY2Y2U3ZjU2YTJjZjA1Y2UiLCJwZXJtaXNzYW8iOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjg1MDMxMDU2LCJleHAiOjE2ODUxMTc0NTZ9.rzVvdefhh9ON3q6tvHyO3QSL7Fk45js8N93zGtynYjA",
    },
  });
};

export default Api;
