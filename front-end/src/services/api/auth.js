import Api from "./Api";

const login = (dados) => {
  return Api().post("/auth/login", dados);
};

const register = (dados) => {
  const formData = new FormData();
  formData.append("nome", dados.nome);
  formData.append("email", dados.email);
  formData.append("senha", dados.senha);
  formData.append("imagem", dados.imagem);
  return Api().post("/auth/register", formData);
};

export { login, register };
