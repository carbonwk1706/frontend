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
<style>


</style>
