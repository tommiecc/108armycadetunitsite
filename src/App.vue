<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AlertComponent from './components/AlertComponent.vue'
import APIService from './services/APIService'

const route = useRoute();
const insertable = ref(null);

const isLocationDisallow = () => {
  // Check the current route and decide if it's a standalone page
  return route.path === "/LocationDisallow";
}

const isMenuOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const updateWindowSize = () => {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  insertable.value = null;
  window.addEventListener('resize', updateWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize);
})

</script>

<template>
  <span v-if="!isLocationDisallow()">
    <span class="min-h-screen relative">
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

        <nav>
          <!-- Navigation -->
          <nav class="bg-[#1a3409] p-3 text-center relative flex justify-between items-center">
            <!-- Hamburger Menu for smaller screens -->
            <button class="icon" @click="toggleMenu()" :class="{ 'hidden': isDesktop }">
              <i class="fa fa-bars text-white fa-2x"></i>
            </button>
            
            <ul 
              class="hidden md:flex space-x-4 items-center" 
              v-if="isDesktop"
            >
              <li>
                <a href="/" class="text-white px-4 py-1 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" class="text-white px-4 py-1 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery" class="text-white px-4 py-1 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/membersOnly" class="text-white px-4 py-1 border border-transparent hover:border-[#c4a000] hover:bg-white/10 transition-all flex items-center">
                  Members Area 🔒
                </a>
              </li>
            </ul>
            
            <!-- "Join Our Unit!" button always visible -->
            <a href="https://www.armycadets.gov.au/find-a-unit/unit?ua=108ACU" 
              target="_blank" 
              class="bg-[#c4a000] text-black px-5 py-2 rounded font-bold uppercase border-2 border-[#ffd700] shadow-md hover:bg-[#ffd700] hover:border-[#c4a000] hover:scale-105 transition-all">
              Join Our Unit!
            </a>
          </nav>

          <nav class="bg-[#1a3409] absolute w-full left-0 z-10 shadow-md dropdown" :class="{ 'show': isMenuOpen, 'hidden': !isMenuOpen }">
            <ul class="p-6 space-y-4">
              <li class="relative">
                <a 
                  class="text-white text-2xl block py-4 px-6 rounded-md transition-all hover:text-black focus:outline-none focus:ring-2 focus:ring-[#c4a000] bg-cover bg-center"
                  href="/" 
                  style="background-image: url('/src/assets/img/dining2.jpg');"
                >
                  <span class="absolute inset-0 bg-black opacity-50 rounded-md"></span>
                  <span class="relative z-10">Home</span>
                </a>
              </li>
              <li class="relative">
                <a 
                  class="text-white text-2xl block py-4 px-6 rounded-md transition-all hover:text-black focus:outline-none focus:ring-2 focus:ring-[#c4a000] bg-cover bg-center"
                  href="/about" 
                  style="background-image: url('/src/assets/img/biv1.jpg'); background-position: center -160px;"
                >
                  <span class="absolute inset-0 bg-black opacity-50 rounded-md"></span>
                  <span class="relative z-10">About</span>
                </a>
              </li>
              <li class="relative">
                <a 
                  class="text-white text-2xl block py-4 px-6 rounded-md transition-all hover:text-black focus:outline-none focus:ring-2 focus:ring-[#c4a000] bg-cover bg-center"
                  href="/gallery" 
                  style="background-image: url('/src/assets/img/starsafari3.jpg'); background-position: center -40px"
                >
                  <span class="absolute inset-0 bg-black opacity-50 rounded-md"></span>
                  <span class="relative z-10">Gallery</span>
                </a>
              </li>
              <li class="relative">
                <a 
                  class="text-white text-2xl block py-4 px-6 rounded-md transition-all hover:text-black focus:outline-none focus:ring-2 focus:ring-[#c4a000] bg-cover bg-center"
                  href="/membersOnly" 
                  style="background-image: url('/src/assets/img/parade.jpg'); background-position: center -20px"
                >
                  <span class="absolute inset-0 bg-black opacity-50 rounded-md"></span>
                  <span class="relative z-10">Members Area 🔒</span>
                </a>
              </li>
            </ul>
          </nav>

        </nav>

        <!-- Marquee -->
        <span ref="insertable">

        </span>

        <div class="aboslute inset-0">
          <RouterView />
        </div>

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

.dropdown {
  transform: translateY(-20px); /* Start from a slightly hidden position */
  opacity: 0; /* Initially hidden */
  transition: all 0.3s ease-in-out; /* Smooth transition */
}

.show {
  transform: translateY(0);
  opacity: 1;
}

</style>

