<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Upload Section -->
    <div class="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">Upload New Files</h2>
      <div 
        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-300"
        @dragover.prevent
        @drop.prevent="handleDrop"
        :class="{ 'border-blue-500 bg-blue-50': isDragging }"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-center">
            <svg 
              class="w-12 h-12 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div class="text-gray-600">
            <span class="font-medium">Drop files here</span> or
            <label class="text-blue-500 hover:text-blue-600 cursor-pointer">
              <span>browse</span>
              <input 
                type="file" 
                class="hidden" 
                @change="handleFileSelect"  
                multiple
              >
            </label>
          </div>
        </div>
      </div>

      <!-- Upload Progress -->
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="mt-4 space-y-3"
      >
        <div 
          v-for="file in uploadingFiles" 
          :key="file.id" 
          class="bg-gray-50 rounded-lg p-3"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium">{{ file.name }}</span>
            <span class="text-sm text-gray-500">{{ file.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${file.progress}%` }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- file List -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">Manage Files</h2>
      <div class="space-y-4">
        <TransitionGroup name="list">
          <div 
            v-for="file in files" 
            :key="file.path"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div class="flex items-center space-x-4">
              <img 
                :src="file.url" 
                :alt="file.name"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <span class="font-medium">{{ file.name }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                @click="toggleList(file)"
                class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="isWhitelisted(file) 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ isWhitelisted(file) ? 'Remove from Gallery' : 'Add to Gallery' }}
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import GalleryService from '@/services/GalleryService'

let files = ref([]);
let uploadId = 0;

const loadfiles = () => {
    try {
        // Update glob pattern to include PDF and Word document files
        const fileModules = import.meta.glob(['../assets/**/*.{png,jpg,jpeg,gif,pdf,doc,docx}'], {
            eager: true
        });

        const loadfiles = Object.entries(fileModules)
            .map(([path, module]) => {
                const name = path.split('/').pop(); // Extract the file name
                return {
                    path,
                    url: module.default, // Ensure the file URL is resolved correctly
                    name: name
                }
            });

        files.value = loadfiles; // Update the files state with the loaded files
    } catch (error) {
        console.log(`Error loading files: ${error.message}`);
    }
}

const isWhitelisted = (file) => {
  return GalleryService.isWhitelisted(file);
}

const toggleList = (file) => {
  GalleryService.toggleList(file);
}


// Handle Files
const handleDrop = (e) => {
    isDragging.value = false;
    const files = [...e.dataTransfer.files];
    handleFiles(files);
}

const handleFileSelect = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
}

const handleFiles = (files, isAdmin) => {
  return;
}

onMounted(() => {
  loadfiles()
  GalleryService.loadList()
})

</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>