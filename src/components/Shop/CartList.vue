<template>
  <div class="herdName">ตะกร้า</div>
  <hr />
  <div class="noBook" v-if="cartList.length == 0" hidden>
    ไม่พบสิ้นค้าในตะกร้า
  </div>
  <div v-else>
    <v-card class="pa-3">
      <v-container>
        <v-row
          class="d-flex flex-row align-center"
          v-for="(item, index) in cartList"
          :key="index"
        >
          <v-col cols="12" class="d-flex flex-row align-center pa-0 mb-3">
            <v-img
              :src="item.imageBook"
              max-height="100"
              max-width="100"
            ></v-img>
            <div>
              <span>{{ item.title }}</span>
              <br />
              <div>฿ {{ item.price }}</div>
            </div>

            <v-spacer></v-spacer>
            <v-btn @click="$emit('onRemove', item.id)" color="error">ลบ</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-10">
      <v-container>
        <v-row>
          <v-col>
            <div class="d-flex flex-row align-center justify-center mb-5">
              เลือกซื้อหนังสือเล่มอื่นต่อ
            </div>
            <div class="d-flex flex-row align-center justify-center mb-5">
              ยอดชำระ ฿{{ total }}
            </div>
            <div class="d-flex flex-row align-center justify-center">
              <v-btn color="success" rounded width="200">ชำระเงิน</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "cartList",
  data() {
    return {
      cartList: [
        {
          id: 1,
          title: "book1",
          imageBook:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
          price: 100,
        },
        {
          id: 2,
          title: "book2",
          imageBook:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
          price: 100,
        },
        {
          id: 3,
          title: "book3",
          imageBook:
            "https://cdn-local.mebmarket.com/meb/server1/225386/Thumbnail/web_large2.gif?2",
          price: 100,
        },
      ],
      total: 0,
      emtyBook: true,
    };
  },
  methods: {
    checkTotal(item) {
      for (let i = 0; i < item.length; i++) {
        this.total += item[i].price;
      }
    },
  },
  mounted() {
    this.checkTotal(this.cartList);
  },
};
</script>

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}
.noBook {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 18px;
  margin-top: 20px;
}
</style>
