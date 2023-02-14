<template>
  <v-container class="pa-5">
    <div class="d-flex justify-center">
      <div class="headborder">My coin: {{ user.coin }}</div>
    </div>
    <div>
      <div class="ma-10">กรุณาเลือกช่องทางการเติม coin</div>
      <v-row row justify="space-around">
        <v-col
          cols="3"
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
      <div class="ma-10">กรุณาเลือกจำนวน coin ที่ต้องการเติม</div>
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
      <div class="d-flex justify-center ma-10">
        <v-btn  color="primary" @click="addCoin(item)">ยืนยัน</v-btn>
      </div>
      
    </div>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "CoinTable",
  data() {
    return {
      coin: [
        {
          coin: "20",
          isClicked: false,
        },
        {
          coin: "50",
          isClicked: false,
        },
        {
          coin: "100",
          isClicked: false,
        },
        {
          coin: "250",
          isClicked: false,
        },
        {
          coin: "500",
          isClicked: false,
        },
        {
          coin: "กำหนดเอง",
          isClicked: false,
        },
      ],
      listBankAccout: [
        {
          initial: "BBL",
          name: "ธนาคารกรุงเทพ จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "KBANK",
          name: "ธนาคารกสิกร จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "SCB",
          name: "ธนาคารไทยพาณิชย์ จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "BAY",
          name: "ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "KTB",
          name: "ธนาคารกรุงไทย จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "TTB",
          name: "ธนาคารทหารไทยธนชาต จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "UOB",
          name: "ธนาคารยูโอบี จำกัด (มหาชน)",
          isClicked: false,
        },
        {
          initial: "CIMB",
          name: "ธนาคาร ซีไอเอ็มบี ไทย จำกัด (มหาชน)",
          isClicked: false,
        },
      ],
      firstDivClicked: false,
      user: [],
    };
  },
  methods: {
    selectBank(item) {
      this.listBankAccout.forEach((c) => (c.isClicked = false));
      item.isClicked = true;
      this.firstDivClicked = true;
      window.scrollTo(0, document.body.scrollHeight);
    },
    selectCoin(item) {
      this.coin.forEach((c) => (c.isClicked = false));
      item.isClicked = true;
      this.firstDivClicked = true;
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
  },
  computed: {},
  mounted() {
    this.fetchApi();
  },
};
</script>

<style scoped>
.highlight {
  box-shadow: 0 0 15px #ffa500;
  transition: box-shadow 0.2s ease-in-out;
}

.highlight:hover {
  box-shadow: 0 0 30px #ffa500;
}
.headborder {
  display: flex;
  justify-content: center;
  width: 300px;
  border: 1px solid #ff5733;
  padding: 10px;
}
.v-card-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
