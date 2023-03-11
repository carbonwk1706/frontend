<template>
  <div>
    <div class="my-3">
      <span @click="goBack" class="back-button"
        ><v-icon>mdi-arrow-left</v-icon> Back</span
      >
    </div>
     <object :data="pdfUrlWithNoToolbar" type="application/pdf" width="100%" height="800px"></object>
  </div>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  name: "PdfViewer",
  data() {
    return {
      pdfUrl: "",
    };
  },
  computed: {
    pdfUrlWithNoToolbar() {
      return `${this.pdfUrl}#toolbar=0&readonly=1`;
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },

  methods: {
    async getBook() {
      const res = await api.get("/books/" + this.$route.params.id);
      this.pdfUrl = res.data.pdf;
    },
    goBack() {
      router.push('/book/'+ this.$route.params.id).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  async mounted() {
    if (this.isLogin) {
      const res = await api.post(
        "/checkBook/" + this.getId() + "/books/" + this.$route.params.id
      );
      if (res.status === 200 && res.data.message === "User has this book") {
        this.getBook();
      } else if (
        res.status === 200 &&
        res.data.message === "User does not have this book"
      ) {
        router.push("/").then(() => {
          window.scrollTo(0, 0);
        });
      }
    } else {
      router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
    }
  },
};
</script>
<style scope>
.back-button {
  font-size: 20px;
  cursor: pointer;
}
</style>
