<script setup>
import { ref, reactive, onMounted } from 'vue'
import DownloadService from '@/services/DownloadsService'

const downloads = reactive({});

const loadDownloads = async () => {
    await DownloadService.loadList();
    downloads.value = DownloadService.whitelist.value;
}
</script>

<template>
    <div>
        <div v-for="(files, folder) in downloads" :key="folder">
            <div class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="download-accordion" />
                <div class="collapse-title text-xl font-medium">{{ folder }}</div>
                <div class="collapse-content">
                    <div v-for="file in files" :key="file.path">
                        <span>{{ file.name }}</span>
                        <a target="_blank">
                            Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>