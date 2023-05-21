<template>
  <div>
    <header class="d-flex justify-content-between" style="height: 10vh">
      <div class="mx-auto">
        <img
          src="../assets/img/logo.png"
          style="width: 60px; margin-top: 20px; margin-bottom: 20px"
        />
        <img
          src="../assets/img/locaminas.png"
          style="margin-top: 20px; margin-left: 20px; margin-bottom: 20px"
        />
      </div>
    </header>

    <div
      class="d-flex"
      style="
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        align-self: center;
        width: 100vw;
        height: 90vh;
        margin: 0;
      "
    >
      <div style="width: 520px">
        <form autocomplete="off">
          <input
            type="text"
            required="true"
            placeholder="Nome"
            v-model="dados.nomeVeiculo"
          />
          <input
            type="text"
            required="true"
            placeholder="Placa"
            v-model="dados.placa"
            pattern="[A-Z]{3}-\d{4}"
            v-mask="'AAA-####'"
            v-on:input="dados.placa = dados.placa.toUpperCase()"
          />
          <select
            placeholder="Combustivel"
            required="true"
            v-model="dados.combustivel"
          >
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Flex">Flex</option>
            <option value="Eletrico">Eletrico</option>
          </select>
          <input
            type="text"
            required="true"
            placeholder="Cor"
            v-model="dados.cor"
          />
          <input
            type="number"
            required="true"
            placeholder="Ano"
            v-model="dados.ano"
            min="1985"
            max="2025"
          />
          <input
            type="number"
            required="true"
            placeholder="Valor"
            v-model="dados.valor"
          />
          <div class="d-flex">
            <button @click="adicionar" type="submit">CADASTRAR</button>
            <button @click="limpar">LIMPAR</button>
          </div>
        </form>
      </div>
      <img src="../assets/img/jeep.png" style="width: 400px" />
    </div>
  </div>
</template>

<script>
import { postCarros } from "@/services/api/carros";
import router from "@/router";
export default {
  data() {
    return {
      dados: {
        nomeVeiculo: "",
        placa: "",
        combustivel: "Diesel",
        cor: "",
        ano: null,
        valor: null,
      },
    };
  },
  methods: {
    adicionar(event) {
      event.preventDefault();
      if (
        !this.dados.nomeVeiculo ||
        !this.dados.placa ||
        !this.dados.combustivel ||
        !this.dados.cor ||
        !this.dados.ano ||
        !this.dados.valor
      ) {
        return;
      } else {
        const dados = {
          nomeVeiculo: this.dados.nomeVeiculo,
          placa: this.dados.placa,
          combustivel: this.dados.combustivel,
          cor: this.dados.cor,
          ano: this.dados.ano,
          valor: this.dados.valor,
        };
        postCarros(dados)
          .then(() => {
            router.push("/listagem");
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert("Placa já cadastrada");
            } else {
              alert("Erro ao cadastrar carro");
            }
          });
      }
    },
    limpar() {
      this.dados = {
        nomeVeiculo: "",
        placa: "",
        combustivel: "Diesel",
        cor: "",
        ano: null,
        valor: null,
      };
    },
  },
};
</script>

<style>
input,
select {
  width: 500px;
  height: 54px;
  border-style: none;
  border-radius: 50px;
  font-size: 22px;
  padding: 6px 20px;
  margin: 10px;
}

button {
  width: 260px;
  height: 54px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  font-size: 22px;
  text-align: left;
  padding: 6px 20px;
  border: 4px solid rgb(255, 255, 255);
  margin: 10px;
}
</style>
