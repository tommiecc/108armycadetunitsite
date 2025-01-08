<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">Manage Files</h2>
        
        <!-- Accordion Group -->
        <div class="space-y-4">
            <TransitionGroup name="list">
                <template v-for="(filesInFolder, folder) in groupedFiles" :key="folder">
                    <div class="collapse collapse-arrow shadow-md rounded-lg">
                        <input 
                            type="radio" 
                            :name="'files-accordion'" 
                            :checked="folder === Object.keys(groupedFiles)[0]"
                        />
                        <div class="collapse-title text-xl font-medium">
                            {{ formatFolderName(folder) }}
                        </div>
                        <div class="collapse-content">
                            <div class="space-y-4">
                                <div 
                                    v-for="file in filesInFolder" 
                                    :key="file.path"
                                    class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div class="flex items-center space-x-4">
                                        <span class="font-medium">{{ file.name }}</span>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <button 
                                            @click="null"
                                            class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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
import { computed, onMounted } from 'vue';
import DownloadsService from '@/services/DownloadsService';

const props = defineProps({
    whitelist: {
        type: Object,
        required: true
    }
});

// Compute grouped files from whitelist
const groupedFiles = computed(() => {
    const groups = {};
    props.whitelist.value.forEach(file => {
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

// Format folder name for display
const formatFolderName = (folder) => {
    return folder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const isWhitelisted = (file) => {
    return DownloadsService.isWhitelisted(file);
}

onMounted(() => {
    DownloadsService.loadList();
});
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