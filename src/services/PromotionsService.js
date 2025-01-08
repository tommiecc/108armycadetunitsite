import { useSecureApi } from '@/utils/useSecureApi';

const { makeRequest, error, loading } = useSecureApi('/api');

const GalleryService = {
    async load() {
        try {
            const saved = await makeRequest('/promotions', {
                method: 'GET'
            });
            const final = JSON.parse(saved.promotions);
            return final;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    async toggle(newValue) {
        try {
            const res = await makeRequest('/promotions', {
                method: 'POST',
                body: JSON.stringify({
                    "content": JSON.stringify(newValue)
                })
            });
        } catch (error) {
            console.error(error.message);
        }
    },
};

export default GalleryService;
