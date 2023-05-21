<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    :style="{
      height: '100vh',
      width: '100vw',
      margin: '0',
      padding: '0',
      background: 'rgba(255, 255, 255, 0)',
    }"
  >
    <img src="../assets/img/logo.png" />
    <img
      src="../assets/img/locaminas.png"
      style="margin-top: 10px; margin-bottom: 30px"
    />
    <input
      class="form-control"
      type="text"
      style="
        width: 309px;
        height: 54px;
        border-style: none;
        border-radius: 50px;
        font-size: 22px;
        padding: 6px 20px;
        margin: 10px;
      "
      placeholder="Email"
      v-model="dados.email"
    />
    <input
      class="form-control"
      type="password"
      style="
        width: 309px;
        height: 54px;
        margin: 10px;
        padding: 6px 20px;
        border-style: none;
        border-radius: 50px;
        font-size: 22px;
        text-align: left;
      "
      placeholder="Senha"
      v-model="dados.senha"
    />
    <button
      class="btn btn-primary text-center"
      style="
        width: 309px;
        height: 54px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0);
        color: rgb(255, 255, 255);
        font-size: 22px;
        text-align: left;
        padding: 6px 20px;
        border: 4px solid rgb(255, 255, 255);
        margin: 10px;
      "
      @click="logar"
    >
      ENTRAR
    </button>
    <div>
      <a
        style="color: rgb(206, 226, 255); font-size: 18px; margin: 10px"
        @click="modalCadastrar()"
        >Cadastrar</a
      >
      <a
        style="color: rgb(206, 226, 255); font-size: 18px; margin: 10px"
        @click="modalRecuperarSenha()"
        >Esqueci minha senha</a
      >
    </div>
    <b-modal hide-footer hide-header-close id="modal-cadastrar">
      <div cllass="d-flex justify-content-center" style="">
        <b-form-input placeholder="Nome" v-model="modal.nome"></b-form-input>
        <b-form-input placeholder="Email" v-model="modal.email"></b-form-input>
        <b-form-input
          placeholder="Senha"
          autocomplete="off"
          v-model="modal.senha"
        ></b-form-input>
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          @change="handleImageUpload"
        />
      </div>
      <div class="d-flex justify-content-center">
        <b-button class="mr-2" variant="secondary">Cancelar</b-button>
        <b-button variant="primary" @click="cadastrar">Confirmar</b-button>
      </div>
    </b-modal>
    <b-modal hide-footer hide-header-close id="modal-recuperar-senha">
      <div cllass="d-flex justify-content-center" style="">
        <b-form-input placeholder="Email"></b-form-input>
      </div>
      <div class="d-flex justify-content-center">
        <b-button
          class="mr-2"
          variant="secondary"
          @click="$bvModal.hide('modal-recuperar-senha')"
          >Cancelar</b-button
        >
        <b-button variant="primary" @click="">Confirmar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { login, register } from "@/services/api/auth";
import router from "@/router";
export default {
  name: "Login",
  data() {
    return {
      dados: {
        email: "",
        senha: "",
      },
      modal: {
        nome: "",
        email: "",
        senha: "",
        imagem: "",
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      this.modal.imagem = event.target.files[0];
    },
    modalCadastrar() {
      this.$bvModal.show("modal-cadastrar");
    },
    modalRecuperarSenha() {
      this.$bvModal.show("modal-recuperar-senha");
    },
    logar() {
      login(this.dados)
        .then(() => {
          router.push("/listagem");
        })
        .catch(() => {
          alert("Usuário ou senha incorreto!");
        });
    },
    cadastrar() {
      register(this.modal)
        .then((res) => {
          alert("Usuario cadastrado");
          this.$bvModal.hide("modal-cadastrar");
          location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url("../assets/img/bg.png") no-repeat;
  background-size: cover;
}

input:focus,
button:focus {
  outline: none;
}
</style>
