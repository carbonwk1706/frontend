<template>
  <div class="d-flex flex-sm-column">
    <v-app-bar :elevation="10" :style="{background: 'linear-gradient(to right, #0008C1, #2146C7)'}">
      <div class="font-text-sidebar ml-5">EBOOK-PUBLISHER</div></v-app-bar
    >
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      :responsive="true"
      max-width="100%"
      style="z-index: 800;"
    >
      <v-list-item nav>
        <template v-slot:append>
          <v-btn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left '"
            @click.stop="toggleRail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-book-open-page-variant"
          title="หนังสือที่วางขาย"
          value="admin"
          @click=" goToBookTable()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
        prepend-icon="mdi-history"
          title="ประวัติการขอขายหนังสือ"
          value="book"
          @click="goToBookQueue()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
        prepend-icon="mdi-book-clock"
        title="ประวัติการจัดการหนังสือ"
        value="historybook"
        @click="goToBookHistory()"
        dense
        nav
        :style="{ 'max-width': '100%' }"
      ></v-list-item>
      <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-cash-multiple"
          title="การจ่ายเงิน"
          value="payment"
          @click="goToPayment()"
          dense
          nav
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
        <v-divider inset></v-divider>
        <v-list-item
        prepend-icon="mdi-account-clock"
        title="ประวัติการแจ้งถอนเงิน"
        value="historypayment"
        @click="goToBookHistoryPayment()"
        dense
        nav
        :style="{ 'max-width': '100%' }"
      ></v-list-item>
      <v-divider inset></v-divider>
        <v-list-item
          prepend-icon="mdi-exit-to-app"
          title="กลับหน้าหลัก"
          value="Home"
          dense
          nav
          @click="goToHome()"
          :style="{ 'max-width': '100%' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import router from "../router";

export default {
  drawer: false,
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", path: "/booktable" },
        { title: "Admins", icon: "mdi-account", path: "/admintable" },
        {
          title: "Users",
          icon: "mdi-account-group-outline",
          path: "/usertable",
        },
      ],
      rail: true,
    };
  },
  methods: {
    toggleRail() {
      this.rail = !this.rail;
    },
    goToBookQueue() {
      router.push("/bookqueue").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToPayment() {
      router.push("/payment").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToHistoryTable() {
      router.push("/historyadmin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToBookTable() {
      router.push("/booktable").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToHome() {
      router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToBookHistory(){
      router.push("/historybookusercrud").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToBookHistoryPayment(){
      router.push("/paymenthistory").then(() => {
        window.scrollTo(0, 0);
      });
    }
  },
};
</script>

<style >
.font-text-sidebar {
  font-family: Prompt, sans-serif;
  font-size: 16px;
  color: #ffffff;
}
.v-app-bar {
  background: linear-gradient(to right, #2F58CD, #B8D7F0);
}
</style>