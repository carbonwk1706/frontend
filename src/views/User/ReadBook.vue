<template>
  <WebViewer />
</template>

<script>
import WebViewer from '@/components/ReadBook.vue'

export default {
  name: 'Webviewer',
  components: {
    WebViewer
  }
}
</script>

<style scope>
#webviewer {
  height: 800px;
}

</style>