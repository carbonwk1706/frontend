<template>
  <v-app>
      <Navbar v-if="showNavbar"/>
    <v-main>
      <v-container>
          <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/HeaderNavbar.vue';

export default {
  name: "App",
  components: {
    Navbar
  },
  computed:{
    showNavbar(){
      return this.$route.path !== '/login'
    }
  },
  
};
</script>
<style>


</style>
