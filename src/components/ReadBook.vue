<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

export default {
  name: "Webviewer",
  props: { initialDoc: { type: String } },
  setup(props) {
    const viewer = ref(null);
    onMounted(() => {
      const path = `${process.env.BASE_URL}webviewer`;
      WebViewer(
        {
          path,
          initialDoc: props.initialDoc,
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
