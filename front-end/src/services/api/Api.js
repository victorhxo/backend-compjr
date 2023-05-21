import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDViYjg5ZjY2Y2U3ZjU2YTJjZjA1Y2UiLCJwZXJtaXNzYW8iOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjg0NjgxMDgwLCJleHAiOjE2ODQ3Njc0ODB9.Dk6wA29jbZCtz6fFQIwKYW9zLlEHZ7_5qbiEmdHS1eY",
    },
  });
};

export default Api;
