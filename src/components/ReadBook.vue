<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

export default {
  name: "Webviewer",
  setup() {
    const viewer = ref(null);
    onMounted(() => {
      const path = `${process.env.BASE_URL}webviewer`;
      const pdfDocument = "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf";
      WebViewer(
        {
          path,
          initialDoc: pdfDocument,
          disabledElements: [
            "header",
            "toolsHeader",
            "annotationPopup",
            "annotationCommentButton",
            "contextMenuPopup",
            "textSelectionButton",
            "panToolButton",
            "outlinesPanelButton",
            "viewControlsButton",
            "searchButton",
            "searchPanel",
          ],
          hideAnnotationPanel: true,
          readOnly: true,
          enableAnnotations: false
        },
        viewer.value
      )
    });
    return { viewer };
  },
};
</script>

<style scope>
#webviewer {
  height: 800px;
}
</style>
