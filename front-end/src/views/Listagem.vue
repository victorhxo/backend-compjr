<template>
  <body
    style="
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      background: rgba(255, 255, 255, 0);
    "
  >
    <header
      class="d-flex justify-content-between align-items-center"
      style="height: 10vh"
    >
      <div class="mx-auto">
        <img
          src="../assets/img/logo.png"
          style="width: 60px; margin-top: 20%; margin-bottom: 20%"
        />
        <img
          src="../assets/img/locaminas.png"
          style="margin-top: 20%; margin-left: 20%; margin-bottom: 20%"
        />
      </div>
    </header>
    <div
      class="d-flex flex-column justify-content-evenly align-items-center"
      style="width: 100vw; height: 82vh; margin: 0; margin-top: 8vh"
    >
      <b-form-input
        type="text"
        style="
          width: 80%;
          background: url('../assets/img/searchicon.png') 5px / auto no-repeat,
            #ffffff;
          height: 30px;
          font-size: 16px;
          padding: 12px 20% 12px 40px;
          border: 1px solid #dddddd;
        "
        placeholder="Search for names"
      />
      <div
        class="table-responsive text-center border rounded-0"
        style="width: 80%; height: 80%; background-color: #ffffff"
      >
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="width: 20%">Nome</th>
              <th style="width: 13%">Placa</th>
              <th style="width: 13%">Combustivel</th>
              <th style="width: 13%">Cor</th>
              <th style="width: 13%">Ano</th>
              <th style="width: 13%">Valor</th>
              <th style="width: 15%">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items">
              <td style="vertical-align: middle; width: 20%">
                {{ item.nomeVeiculo }}
              </td>
              <td style="vertical-align: middle; width: 13%">
                {{ item.placa }}
              </td>
              <td style="vertical-align: middle; width: 13%">
                {{ item.combustivel }}
              </td>
              <td style="vertical-align: middle; width: 13%">
                {{ item.cor }}
              </td>
              <td style="vertical-align: middle; width: 13%">
                {{ item.ano }}
              </td>
              <td style="vertical-align: middle; width: 13%">
                {{ item.valor }}
              </td>
              <td style="width: 15%">
                <div class="d-flex justify-content-center align-items-center">
                  <b-button
                    variant="primary"
                    size="sm"
                    style="
                      width: 60px;
                      height: 30px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                    @click="modalEditar(item)"
                  >
                    Editar
                  </b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    style="
                      width: 60px;
                      height: 30px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                    @click="modalExluir(item)"
                  >
                    Excluir
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <b-modal hide-header-close id="modal-editar" @ok="editar">
          <b-form-input v-model="dados.nomeVeiculo"></b-form-input>
          <b-form-input v-model="dados.placa"></b-form-input>
          <b-form-select v-model="dados.combustivel">
            <option value="Diesel">Diesel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Flex">Flex</option>
            <option value="Eletrico">Eletrico</option>
          </b-form-select>
          <b-form-input v-model="dados.cor"></b-form-input>
          <b-form-input v-model="dados.ano"></b-form-input>
          <b-form-input v-model="dados.valor"></b-form-input>
        </b-modal>
        <b-modal
          id="modal-exluir"
          @ok="exluir"
          title="Confirmação de exclusão"
          hide-footer
          hide-header-close
        >
          <p>Deseja realmente excluir este carro?</p>
          <div class="d-flex justify-content-end">
            <b-button
              variant="secondary"
              class="mr-2"
              @click="$bvModal.hide('modal-exluir')"
              >Cancelar</b-button
            >
            <b-button variant="danger" @click="exluir">Excluir</b-button>
          </div>
        </b-modal>
      </div>
    </div>
  </body>
</template>

<script>
import { getCarros, putCarros, deleteCarros } from "@/services/api/carros";
export default {
  data() {
    return {
      showModal: false,
      items: [],
      dados: {
        id: "",
        nomeVeiculo: "",
        placa: "",
        combustivel: "",
        cor: "",
        ano: "",
        valor: "",
      },
    };
  },
  methods: {
    modalEditar(item) {
      this.dados = item;
      this.$bvModal.show("modal-editar");
    },
    modalExluir(item) {
      this.dados = item;
      this.$bvModal.show("modal-exluir");
    },
    editar() {
      const dados = {
        nomeVeiculo: this.dados.nomeVeiculo,
        placa: this.dados.placa,
        combustivel: this.dados.combustivel,
        cor: this.dados.cor,
        ano: this.dados.ano,
        valor: this.dados.valor,
      };
      putCarros(this.dados.id, dados)
        .then((res) => {
          location.reload();
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400) {
            alert("Placa já cadastrada");
          } else {
            alert("Erro ao cadastrar carro");
          }
        });
    },
    exluir() {
      deleteCarros(this.dados.id)
        .then((res) => {
          this.$bvModal.hide("modal-exluir");
          location.reload();
        })
        .catch((error) => {
          console.error(error);
          location.reload();
        });
    },
  },
  mounted() {
    getCarros()
      .then((res) => {
        this.items = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
