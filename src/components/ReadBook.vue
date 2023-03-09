<template>
  <div>
    <div class="my-3">
      <span @click="goBack" class="back-button"
        ><v-icon>mdi-arrow-left</v-icon> Back</span
      >
    </div>
    <iframe :src="pdfUrlWithNoToolbar" width="100%" height="800px"></iframe>
  </div>
</template>

<script>
export default {
  name: "PdfViewer",
  data() {
    return {
      pdfUrl:
        "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
    };
  },
  computed: {
    pdfUrlWithNoToolbar() {
      return `${this.pdfUrl}#toolbar=0&readonly=1`;
    },
  },

  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
<style scope>
.back-button {
  font-size: 20px;
  cursor: pointer;
}
</style>
