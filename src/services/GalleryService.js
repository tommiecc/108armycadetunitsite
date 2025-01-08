import { useSecureApi } from '@/utils/useSecureApi';
import GithubService from './GithubService';
import { ref } from 'vue'

const { makeRequest, error, loading } = useSecureApi('/api');

const whitelist = ref([]);


const GalleryService = {
    async uploadImage(image) {
        GithubService.uploadFile(image);
    },
    async loadList() {
        try {
            const saved = await makeRequest('/images', {
                method: 'GET'
            });
            const final = JSON.parse(saved.images);
            whitelist.value = final;
        } catch (error) {
            console.error(error);
        }
    },
    async saveList() {
        try {
            const res = await makeRequest('/images', {
                method: 'POST',
                body: JSON.stringify({
                    "content": JSON.stringify(whitelist.value)
                })
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    isWhitelisted(imageName) {
        return whitelist.value.some(item =>
            JSON.stringify(item) === JSON.stringify(imageName)
        );
    },
    toggleList(imageName) {
        const index = whitelist.value.findIndex(image => JSON.stringify(image) === JSON.stringify(imageName));
        if (index !== -1) {
            whitelist.value.splice(index, 1);
        } else {
            whitelist.value.push(imageName);
        }
        this.saveList();
    },
    whitelist
};

export default GalleryService;
