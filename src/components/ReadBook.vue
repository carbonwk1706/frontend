<template>
  <div>
    <div class="my-3">
      <span @click="goBack" class="back-button"
        ><v-icon>mdi-arrow-left</v-icon> Back</span
      >
    </div>
    <iframe :src="pdfUrl" width="100%" height="800px"></iframe>
  </div>
</template>

<script>
import api from "@/services/api";

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
  },

  methods: {
    async getBook() {
      const res = await api.get("/books/" + this.$route.params.id);
      this.pdfUrl = res.data.pdf
      console.log(this.pdfUrl);
    },
    goBack() {
      window.history.back();
    },
  },
  mounted() {
    this.getBook();
  },
};
</script>
<style scope>
.back-button {
  font-size: 20px;
  cursor: pointer;
}
</style>
