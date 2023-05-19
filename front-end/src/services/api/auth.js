import Api from "./Api";

const login = () => {
  return new Promise((resolve, reject) => {
    Api()
      .post("/auth/login", { email: "victor", senha: "123" })
      .then((res) => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
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
