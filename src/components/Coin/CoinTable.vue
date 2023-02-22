<template>
  <Auth v-if="isLogin"
    ><v-container fluid>
      <div class="d-flex justify-center">
        <div class="headborder">
          <span style="font-size: 16px" class="mr-2 font-text"> Coin : </span>
          <span style="font-size: 16px; color: #22d122" class="mr-2 font-text">
            {{ user.coin }}
          </span>
        </div>
      </div>
      <div>
        <div class="ma-10">กรุณาเลือกช่องทางการเติม coin</div>
        <v-row row justify="space-around">
          <v-col
            xs="12"
            sm="6"
            md="4"
            lg="3"
            v-for="item in listBankAccout"
            :key="item.listBankAccout"
          >
            <v-card
              :style="{ width: '200px', height: '150px', margin: '10px' }"
              :class="{ highlight: item.isClicked }"
              @click="selectBank(item)"
            >
              <v-card-text class="d-flex justify-center">
                {{ item.name }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-if="firstDivClicked" class="pt-10">
        <div class="ma-10">  
          <span class="mr-2">กรุณาเลือกจำนวน coin ที่ต้องการเติมผ่าน</span>
          <span style="font-size: 16px; color: #22d122" class="mr-2 font-text">"{{ selectedBankAccount }}"</span>
        </div>
        <v-row class="mx-0" justify="center">
          <v-col cols="4" v-for="item in coin" :key="item.coin">
            <v-card
              :style="{ height: '200px', margin: '10px' }"
              :class="{ highlight: item.isClicked }"
              @click="selectCoin(item)"
            >
              <v-card-text class="d-flex justify-center">
                {{ item.coin }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div
          class="d-flex justify-center ma-10"
          v-if="bankIsClicked && coinIsClicked"
        >
          <v-btn class="button" @click="addCoin">ยืนยัน</v-btn>
        </div>
        <div class="d-flex justify-center ma-10" v-else>
          <v-btn class="buttonDis" disabled>ยืนยัน</v-btn>
        </div>
      </div>

      <v-dialog
        v-model="showConfirm"
        max-width="500"
        persistent
        style="z-index: 900"
      >
        <v-card>
          <div class="d-flex justify-end pa-1">
            <v-icon @click="toggleShowModalConfirm">mdi-close</v-icon>
          </div>
          <v-card-title class="text-center font-text">
            ระบุจำนวน Coin ที่ต้องการ
          </v-card-title>
          <div class="pa-3 center-loading">
            <v-text-field
              label="ระบุจำนวน Coin ที่ต้องการ"
              v-model="selectedCoin"
              variant="outlined"
            ></v-text-field>
          </div>
          <v-card-actions class="center">
            <v-btn color="white" class="btn-bg" text @click="addCoin">
              ยืนยัน
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container></Auth
  >
  <Auth v-else>
    <div></div>
  </Auth>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import Auth from "../Auth.vue";

export default {
  name: "CoinTable",
  components: {
    Auth,
  },
  data() {
    return {
      listBankAccout: [
        {
          name: "ธนาคารกรุงเทพ จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารกสิกร จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารไทยพาณิชย์ จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารกรุงไทย จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารทหารไทยธนชาต จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคารยูโอบี จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          name: "ธนาคาร ซีไอเอ็มบี ไทย จำกัด (มหาชน)",
          isClicked: false,
        },
      ],
      coin: [
        {
          coin: 20,
          isClicked: false,
        },
        {
          coin: 50,
          isClicked: false,
        },
        {
          coin: 100,
          isClicked: false,
        },
        {
          coin: 250,
          isClicked: false,
        },
        {
          coin: 500,
          isClicked: false,
        },
        {
          coin: "กำหนดเอง",
          isClicked: false,
        },
      ],
      firstDivClicked: false,
      bankIsClicked: false,
      coinIsClicked: false,
      selectedBankAccount: null,
      selectedCoin: null,
      user: [],
      resultSelect: null,
      showConfirm: false,
    };
  },
  methods: {
    selectBank(item) {
      this.listBankAccout.forEach((c) => (c.isClicked = false));
      item.isClicked = true;
      this.firstDivClicked = true;
      this.bankIsClicked = true;
      this.selectedBankAccount = item.name;
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    },
    selectCoin(item) {
      if (item.coin === "กำหนดเอง" && this.showConfirm === false) {
        this.selectedCoin = null;
        this.showConfirm = !this.showConfirm;
        return;
      } else {
        this.coin.forEach((c) => (c.isClicked = false));
        item.isClicked = true;
        this.firstDivClicked = true;
        this.coinIsClicked = true;
        this.selectedCoin = item.coin;
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    addCoin() {
      this.resultSelect = {
        bankAccount: this.selectedBankAccount,
        coin: parseInt(this.selectedCoin),
      };
      this.showConfirm = false;
      this.$store.dispatch("checkoutCoin/setReceipt", this.resultSelect);
      router.push("/checkoutcoin");
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    toggleShowModalConfirm() {
      this.showConfirm = !this.showConfirm;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    }
  },
};
</script>

<style scoped>
.highlight {
  box-shadow: 0 0 15px #37c13d;
  transition: box-shadow 0.2s ease-in-out;
}

.highlight:hover {
  box-shadow: 0 0 30px #37c13d;
}
.headborder {
  display: flex;
  justify-content: center;
  width: 300px;
  border: 1px solid #22d122;
  padding: 10px;
}
.v-card-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.button {
  background-color: #00af70;
  color: white;
  height: 50px;
  width: 300px;
  text-align: center;
}
.buttonDis {
  background-color: #cccccc;
  color: white;
  height: 50px;
  width: 300px;
  text-align: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-bg {
  background-color: #00af70;
  width: 100%;
  padding: 5px;
  margin-bottom: 16px;
  max-width: 120px;
}
</style>
