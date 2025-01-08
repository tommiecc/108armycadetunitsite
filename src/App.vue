<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import AlertComponent from './components/AlertComponent.vue'
import APIService from './services/APIService'

const route = useRoute();
const insertable = ref(null);

const isLocationDisallow = () => {
  // Check the current route and decide if it's a standalone page
  return route.path === "/LocationDisallow";
}

onMounted(() => {
  insertable.value = null;
}); 

</script>

<template>
  <span v-if="!isLocationDisallow()">
    <span class="min-h-screen">
      <div class="container mx-auto max-w-full bg-white shadow-lg">
        <!-- Header -->
        <header class="bg-gradient-to-b from-[#1a3409] to-[#2d4f0c] text-white p-5 text-center border-b-4 border-[#c4a000]">
          <div class="flex items-center justify-center">
            <img src="/img/logo.png" alt="Unit Crest" class="float-left mr-4" width=100 height=100>
            <div>
              <h1 class="text-3xl font-bold">108 Army Cadet Unit - Kenmore</h1>
              <h3 class="text-xl mt-2 italic">"A Rising Generation Under a Rising Sun"</h3>
            </div>
          </div>
        </header>

        <!-- Navigation -->
        <nav class="bg-[#1a3409] p-3 text-center relative flex justify-center items-center">
          <a href="/" class="text-white px-4 py-1 mx-2 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
            Home
          </a>
          <a href="/about" class="text-white px-4 py-1 mx-2 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
            About Us
          </a>
          <a href="/gallery" class="text-white px-4 py-1 mx-2 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
            Gallery
          </a>
          <a href="/membersOnly" class="text-white px-4 py-1 mx-2 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all flex items-center">
            Members Area 🔒
          </a>
          <a href="https://www.armycadets.gov.au/find-a-unit/unit?ua=108ACU" target="_blank" class="absolute right-5 bg-[#c4a000] text-black px-5 py-2 rounded font-bold uppercase border-2 border-[#ffd700] shadow-md hover:bg-[#ffd700] hover:border-[#c4a000] hover:scale-105 transition-all">
            Join Our Unit!
          </a>
        </nav>

        <!-- Marquee -->
        <span ref="insertable">

        </span>

        <RouterView />

        <!-- Footer -->
        <footer class="bg-[#1a3409] text-center p-5 mt-5">
          <p class="text-white">© 2024 108 Army Cadet Unit - Kenmore | Last Updated: December 28, 2024</p>
          <a href="/copyright" class="text-white hover:text-[#c4a000] hover:font-semibold">Privacy | Copyright | Disclaimer</a>
        </footer>
      </div>
    </span>
  </span>
</template>

<style scoped>
.pause-hover:hover {
  animation-play-state: paused;
}
</style>

<script>
export default {
  data() {
    return {
      htmlContent: "",
    };
  },
  
  onMounted() {
    
  },
};

</script>