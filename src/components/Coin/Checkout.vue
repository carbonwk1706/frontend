<template>
  <h1 class="text-center mt-6 mb-6">ชำระเงิน</h1>
  <v-container>
    <span>สรุปรายการเติม</span>
    <v-divider class="mt-3 mb-6"></v-divider>

    <v-card class="card px-12 py-6">
      <v-row>
        <v-col cols="12" class="d-flex flex-row align-center pa-0 mb-3 mt-3">
          <v-row>
            <v-col cols="6" class="d-flex justify-start"
              ><span>UserID: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">123456789</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>Username: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">name</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>จำนวนที่เติม: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">100</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>ช่องทางการเติม: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">ธนาคาร</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>วันที่เวลา: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">12/12/2566 เวลา: 00.00</span></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-card class="mt-6 mb-6 card">
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-center mb-5">
            <span style="font-size: 18px" class="text-total-price mr-2"
              >ยอดชำระ</span
            >
            <span class="text-total-price"> 123 </span>
          </div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn class="btn-bg" rounded width="200"
              ><span style="font-size: 18px">ชำระเงิน</span></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      rules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Avatar size should be less than 2 MB!"
          );
        },
      ],
      imageUrl: null,
    };
  },
  methods: {},
};
</script>

<style scoped>
.card {
  background-color: #f6f6f6;
}
.btn-bg {
  color: white;
  background-color: #f0a04b;
}
</style>
