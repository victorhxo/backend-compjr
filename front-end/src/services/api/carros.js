import Api from "./Api";

const getCarros = () => {
  return Api().get("/carros");
};

const postCarros = (dados) => {
  return Api().post("/carros", dados);
};

const putCarros = (id, dados) => {
  return Api().put(`/carros/${id}`, dados);
};

const deleteCarros = (id) => {
  return Api().delete(`/carros/${id}`);
};

export { getCarros, postCarros, putCarros, deleteCarros };
