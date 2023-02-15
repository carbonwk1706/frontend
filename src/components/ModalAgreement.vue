<template>
  <v-dialog class="pa-0" v-model="newUser" width="600px" persistent>
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
        <br />
        <p>1. ความยินยอมในการมอบประสบการณ์เฉพาะบุคคล (Personalization)</p>
        <br />
        <p>2. ความยินยอมในการพัฒนาการให้บริการ</p>
        <br />
        <p>3. ความยินยอมในการให้เสนอสินค้า บริการ และโปรโมชั่นพิเศษต่างๆ</p>
        <br />
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
export default {
  methods: {
    noNewUser() {
      this.$store.dispatch("auth/noNewUser");
      this.showAlert();
    },
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        title: "บันทึกข้อมูลสำเร็จ",
        allowOutsideClick: false,
        confirmButtonColor: "#00af70",
        text: "ยินดีต้องรับ " + this.getName(),
        icon: "success",
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    },
    getName() {
      return this.$store.getters["auth/getName"];
    },
  },
  computed: {
    newUser() {
      return this.$store.getters["auth/isNewUser"];
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-color {
  background-color: #00af70;
  width: 100%;
}
</style>
