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
        <div class="mx-2 mt-10 mb-5 font-text">
          กรุณาเลือกช่องทางการเติม Coin
        </div>
        <v-divider class="mb-6"></v-divider>
        <v-row class="d-flex justify-center" fixed dense>
          <v-col
            cols="6"
            v-for="item in listBankAccout"
            :key="item.listBankAccout"
          >
            <v-card
              :class="{ highlight: item.isClicked }"
              @click="selectBank(item)"
              class="card-bank-responsive"
            >
              <v-img
                :src="'http://localhost:3000/uploads/' + item.image"
                class="responsive-img-bank"
              ></v-img>

              <v-divider class="my-1"></v-divider>
              <div class="d-flex align-center">
                <v-card-text class="font-text2"> {{ item.name }} </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-if="firstDivClicked" class="pt-5">
        <div class="mx-2 mt-10 mb-5">
          <span class="mr-2 font-text"
            >กรุณาเลือกจำนวน Coin ที่ต้องการเติมผ่าน</span
          >
          <span style="color: #22d122" class="mr-2 font-text"
            >"{{ selectedBankAccount }}"</span
          >
        </div>
        <v-divider class="mb-6"></v-divider>
        <v-row class="d-flex align-center justify-center mx-0" fixed dense>
          <v-col cols="4" v-for="item in coin" :key="item.coin">
            <v-card
              class="card-coin-responsive"
              :class="{ highlight: item.isClicked }"
              @click="selectCoin(item)"
            >
              <v-card-text class="d-flex justify-center text-coin font-size">
                <span class="mr-1">{{ item.coin }}</span>
                <span v-if="item.coin !== 'กำหนดเอง'"
                  ><v-img
                    src="https://www.pngall.com/wp-content/uploads/10/USD-Coin-Logo-PNG-File.png"
                    class="responsive-img-coin"
                  ></v-img
                ></span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div
          class="d-flex justify-center ma-10 "
          v-if="bankIsClicked && coinIsClicked"
        >
          <v-btn class="button" @click="addCoin">ยืนยัน</v-btn>
        </div>
        <div class="d-flex justify-center ma-10 " v-else>
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
              type="number"
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
import io from "socket.io-client";

export default {
  name: "CoinTable",
  components: {
    Auth,
  },
  data() {
    return {
      socket: null,
      socketioURL: "http://localhost:3000",
      listBankAccout: [
        {
          name: "สแกน QR พร้อมเพย์",
          image: "qr.png",
          isClicked: false,
        },
        {
          name: "โอนเงินเข้าบัญชีธนาคาร",
          image: "bank.png",
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
      if (this.selectedCoin <= 0) {
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          allowOutsideClick: false,
          width: "500",
          text: "กรุณากรอกจำนวนเงินให้ถูกต้อง",
          icon: "warning",
          button: "OK",
        });
      } else {
        if (this.selectedBankAccount === "โอนเงินเข้าบัญชีธนาคาร") {
          this.showConfirm = false;
          this.$store.dispatch("checkoutCoin/setReceipt", this.resultSelect);
          router.push("/checkoutcoin");
        } else {
          this.showConfirm = false;
          this.$store.dispatch("checkoutCoin/setReceipt", this.resultSelect);
          router.push("/checkoutcoin/qrcode");
        }
      }
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    toggleShowModalConfirm() {
      this.showConfirm = !this.showConfirm;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    if (this.isLogin) {
      this.fetchApi();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("receipt-approved", () => {
      this.fetchApi();
    });
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
  font-size: 24px;
}
.buttonDis {
  background-color: #cccccc;
  color: white;
  height: 50px;
  width: 300px;
  text-align: center;
  font-size: 24px;
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
.text-coin {
  font-size: 16px;
  color: #00af70;
  font-weight: bolder;
  height: "200px";
  margin: "10px";
}
.font-text {
  font-size: 24px;
  font-weight: bolder;
  font-family: Prompt, sans-serif;
}
.font-text2 {
  font-size: 16px;
  font-weight: bolder;
  font-family: Prompt, sans-serif;
}
.card-coin-responsive {
  height: 200px;
  width: 344px;
  margin: 10px;
}
.card-bank-responsive {
  height: 280px;
  width: 100%;
}
.font-size {
  font-size: 36px;
}
.responsive-img-bank {
  height: 200px;
  width: 100%;
}
.responsive-img-coin {
  height: 50px;
  width: 50px;
}

@media (max-width: 1200px) {
  .card-coin-responsive {
    height: 150px;
    width: 100%;
    margin: 10px 0;
  }
  .card-bank-responsive {
    height: 250px;
    width: 100%;
  }
  .card-bank-responsive v-img {
    max-height: 150px;
    max-width: 250px;
  }
  .responsive-img-bank {
    width: 100%;
    height: 180px;
  }
  .font-size {
    font-size: 24px;
  }
  .responsive-img-coin {
    height: 40px;
    width: 40px;
  }
  .font-text {
    font-size: 20px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .font-text2 {
    font-size: 12px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
}
@media (max-width: 950px) {
  .card-coin-responsive {
    height: 125px;
    width: 100%;
    margin: 10px 0;
  }
  .card-bank-responsive {
    height: 225px;
    width: 100%;
  }
  .responsive-img-bank {
    width: 100%;
    height: 150px;
  }
  .button {
    background-color: #00af70;
    color: white;
    height: 45px;
    width: 250px;
    text-align: center;
    font-size: 20px;
  }
  .buttonDis {
    background-color: #cccccc;
    color: white;
    height: 45px;
    width: 250px;
    text-align: center;
    font-size: 20px;
  }
}
@media (max-width: 750px) {
  .card-coin-responsive {
    height: 100px;
    width: 100%;
    margin: 10px 0;
  }
  .card-bank-responsive {
    width: 100%;
    height: 200px;
  }
  .font-text {
    font-size: 16px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .responsive-img-bank {
    width: 100%;
    height: 120px;
  }
    .responsive-img-coin {
    height: 35px;
    width: 35px;
  }
    .button {
    background-color: #00af70;
    color: white;
    height: 40px;
    width: 225px;
    text-align: center;
    font-size: 18px;
  }
  .buttonDis {
    background-color: #cccccc;
    color: white;
    height: 40px;
    width: 225px;
    text-align: center;
    font-size: 18px;
  }
}
@media (max-width: 600px) {
  .card-coin-responsive {
    height: 75px;
    width: 100%;
    margin: 10px 0;
  }
  .card-bank-responsive {
    width: 100%;
    height: 160px;
  }
  .font-size {
    font-size: 16px;
  }
  .responsive-img-coin {
    height: 30px;
    width: 30px;
  }
  .font-text {
    font-size: 12px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .font-text2 {
    font-size: 12px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .responsive-img-bank {
    width: 100%;
    height: 100px;
  }
    .button {
    background-color: #00af70;
    color: white;
    height: 30px;
    width: 200px;
    text-align: center;
    font-size: 16px;
  }
  .buttonDis {
    background-color: #cccccc;
    color: white;
    height: 30px;
    width: 200px;
    text-align: center;
    font-size: 16px;
  }
}
@media (max-width: 450px) {
  .card-bank-responsive {
    width: 100%;
    height: 130px;
  }
  .font-size {
    font-size: 12px;
  }
  .responsive-img-coin {
    height: 20px;
    width: 20px;
  }
  .font-text2 {
    font-size: 8px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .responsive-img-bank {
    height: 75px;
    width: 100%;
  }
    .button {
    background-color: #00af70;
    color: white;
    height: 30px;
    width: 175px;
    text-align: center;
    font-size: 12px;
  }
  .buttonDis {
    background-color: #cccccc;
    color: white;
    height: 30px;
    width: 175px;
    text-align: center;
    font-size: 12px;
  }
}
@media (max-width: 400px) {
  .card-coin-responsive {
    height: 50px;
    width: 100%;
    margin: 10px 0;
  }
  .card-bank-responsive {
    width: 100%;
    height: 110px;
  }
  .font-size {
    font-size: 8px;
  }
  .responsive-img-coin {
    height: 15px;
    width: 15px;
  }
  .font-text {
    font-size: 8px;
    font-weight: bolder;
    font-family: Prompt, sans-serif;
  }
  .responsive-img-bank {
    width: 100%;
    height: 50px;
  }
    .button {
    background-color: #00af70;
    color: white;
    height: 25px;
    width: 150px;
    text-align: center;
    font-size: 8px;
  }
  .buttonDis {
    background-color: #cccccc;
    color: white;
    height: 25px;
    width: 150px;
    text-align: center;
    font-size: 8px;
  }
}
</style>
