<template>
  <h1 class="text-center">Home</h1>

  <v-dialog v-model="newUser" width="600px" persistent>
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5">ข้อตกลงในการให้บริการ</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        ><p>
          เราให้ความสำคัญต่อข้อมูลส่วนบุคคลของคุณ
          เราจะทำงานอย่างดีที่สุดเพื่อรักษาข้อมูลส่วนบุคคลของคุณให้ปลอดภัย
          โดยคุณสามารถเลือกที่จะให้ความยินยอม
          หรือไม่ให้ความยินยอมในการจัดการข้อมูลส่วนบุคคลแก่เราก็ได้
          โดยความยินยอมและการจัดการข้อมูลส่วนบุคคลจะแบ่งเป็นหัวข้อดังนี้
        </p>
        <br>
        <p>
          1. ความยินยอมในการมอบประสบการณ์เฉพาะบุคคล (Personalization)
        </p>
        <br>
        <p>
          2. ความยินยอมในการพัฒนาการให้บริการ
        </p>
        <br>
        <p>
          3. ความยินยอมในการให้เสนอสินค้า บริการ และโปรโมชั่นพิเศษต่างๆ
        </p>
        <br>
      </v-card-text>
      <v-divider></v-divider>
        <v-card-actions class="center">
          <v-btn class="btn-color" color="white" text @click="noNewUser()">
            <span class="text-center">ให้ความยินยอม</span>
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "HomeView",
  methods:{
    noNewUser(){
      this.$store.dispatch("auth/noNewUser");
    }
  },
  computed: {
    newUser() {
      return this.$store.getters["auth/isNewUser"];
    },
  },

});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-color{
  background-color: #00af70;;
  width: 100%;
}
</style>
