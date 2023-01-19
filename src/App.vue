<template>
  <v-app>
      <HeaderNavbar v-if="showNavbar"/>
    <v-main>
      <v-container>
          <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNavbar from './components/HeaderNavbar.vue';

export default {
  name: "App",
  components: {
    HeaderNavbar
  },
  computed:{
    showNavbar(){
      return this.$route.path !== '/login'
    }
  },
  
};
</script>
<style scoped>

.header_action {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.12);
  margin-right: 1rem;
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
}


</style>
