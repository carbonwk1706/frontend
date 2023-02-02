<template>
  <v-container class="grey lighten-5">
    <div class="mb-5 d-flex justify-center">
      <h1>รายการที่อยากได้</h1>
    </div>
    <div v-if="wishList.length > 0" hidden>
      <div class="d-flex justify-center">
        <img
          src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
          alt=""
          width="200"
          height="200"
        />
      </div>
      <div class="noWish">ยังไม่มีรายการที่อยากได้</div>
    </div>
    <div v-else>
      <div class="mb-5 d-flex justify-start">
        <h2>รายการที่อยากได้</h2>
      </div>
      <hr class="mb-5" />

      <v-row>
        <v-col v-for="(item, index) in wishList" :key="index">
          <v-card class="mx-auto" max-width="180">
            <v-img :src="item.imageBook" height="250px"
              ><v-icon
                size="40"
                @click="testClick"
                class="ml-auto mt-auto close-button"
                >mdi-close-circle</v-icon
              ></v-img
            >
            <v-card-title> {{ item.name }} </v-card-title>
            <v-card-subtitle>
              {{ item.author }}/{{ item.publisher }}
            </v-card-subtitle>
            <v-row class="d-flex justify-end ma-3">
              <v-btn color="success" @click="addItem(item)">
                ฿ {{ item.price }}
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Wish",
  data() {
    return {
      wishList: [],
    };
  },
  methods: {
    getWishList() {
      this.wishList = this.$store.state.wishList;
    },
    testClick() {
      alert("Cilck");
    },
  },
  mounted() {
    this.getWishList();
  },
};
</script>

<style scoped>
.noWish {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}
.close-button {
  display: flex;
  color: gray;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
