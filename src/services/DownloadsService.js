import { useSecureApi } from '@/utils/useSecureApi';
import GithubService from './GithubService';
import { ref } from 'vue'

const { makeRequest, error, loading } = useSecureApi('/api');

const whitelist = ref([]);


const GalleryService = {
    async uploadFile(file) {
        GithubService.uploadFile(file);
    },
    async loadList() {
        try {
            const saved = await makeRequest('/downloads', {
                method: 'GET'
            });
            const final = JSON.parse(saved.files);
            whitelist.value = final;
        } catch (error) {
            console.error(error);
        }
    },
    async saveList() {
        try {
            const res = await makeRequest('/downloads', {
                method: 'POST',
                body: JSON.stringify({
                    "content": JSON.stringify(whitelist.value)
                })
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    isWhitelisted(fileName) {
        return whitelist.value.some(item =>
            JSON.stringify(item) === JSON.stringify(fileName)
        );
    },
    toggleList(fileName) {
        const index = whitelist.value.findIndex(file => JSON.stringify(file) === JSON.stringify(fileName));
        if (index !== -1) {
            whitelist.value.splice(index, 1);
        } else {
            whitelist.value.push(fileName);
        }
        this.saveList();
    },
    whitelist
};

export default GalleryService;
