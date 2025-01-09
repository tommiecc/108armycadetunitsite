<template>
    <div class="bg-white">        
        <!-- Accordion Group -->
        <div class="space-y-4">
            <TransitionGroup name="list">
                <template v-for="(filesInFolder, folder) in groupedFiles" :key="folder">
                    <div class="collapse collapse-arrow shadow-md rounded-lg">
                        <input 
                            type="radio" 
                            :name="'files-accordion'" 
                        />
                        <div class="collapse-title text-xl font-medium text-black">
                            {{ folder }}
                        </div>
                        <div class="collapse-content">
                            <div class="space-y-4">
                                <div 
                                    v-for="file in filesInFolder" 
                                    :key="file.path"
                                    class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div class="flex items-center space-x-4">
                                        <span class="font-medium text-black">{{ file.name }}</span>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <button 
                                            @click="downloadFile(file.url)"
                                            class="px-4 py-2 rounded-md text-sm font-medium shadow-sm text-black bg-gray-200 hover:scale-105 hover:bg-[#1a3409] hover:text-white"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import DownloadsService from '@/services/DownloadsService';

let files = ref([]);

// New computed property to group files by folder
const groupedFiles = computed(() => {
  const groups = {};
  files.value.forEach(file => {
    // Extract folder name from path
    const pathParts = file.path.split('/');
    const folder = pathParts[pathParts.length - 2]; // Get parent folder name
    
    if (!groups[folder]) {
      groups[folder] = [];
    }
    groups[folder].push(file);
  });
  return groups;
});


const downloadFile = (file) => {
    window.open(file, '_blank').focus();
}

onMounted(async () => {
    await DownloadsService.loadList();
    files.value = DownloadsService.whitelist.value;
});
</script>

<style>

</style>