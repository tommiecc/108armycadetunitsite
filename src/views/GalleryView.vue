<script setup>
import { ref, onMounted, computed } from 'vue'
import GalleryService from '@/services/GalleryService'
import LoadingComponent from '@/components/LoadingComponent.vue'

let images = ref([]);
let selectedImage = ref(null);
let isLoading = ref(true);

const loadImages = () => {
  images.value = GalleryService.whitelist.value;
};

const openLightbox = (image) => {
    selectedImage.value = image
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    selectedImage.value = null
    document.body.style.overflow = 'auto'
}

onMounted(async () => {
  await GalleryService.loadList();
  loadImages();
  setInterval(() => {
    isLoading.value = false;
  }, 3000); // three second buffer allows image requests to be resolved.
})

</script>

<template>
<div v-if="isLoading">
  <LoadingComponent />
</div>
<div v-if="!isLoading">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
      <div v-for="image in images" 
           :key="image.path"
           class="relative group overflow-hidden rounded-lg shadow-lg aspect-w-16 aspect-h-9"
           @click="openLightbox(image)">
        <img :src="image.url" 
             :alt="image.name"
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer">
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          {{ image.name }}
        </div>
      </div>
    </div>

    <div v-if="selectedImage" 
         class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
         @click="closeLightbox">
      <div class="flex flex-col items-center">
        <img :src="selectedImage.url" 
            :alt="selectedImage.name"
            class="max-h-[90vh] max-w-[90vw] object-contain">
        <br>
        <p class="text-grey-500 font-balance">
          Click anywhere to close.
        </p>
      </div>
    </div>
  </div>
</div>
</template>
