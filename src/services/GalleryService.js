import { ref } from 'vue'

const whitelist = ref([]);


const GalleryService = {
    async loadList() {
        try {
            const res = await fetch("https://108armycadetunit.site/api/images", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const saved = await res.json(); 
            console.log(saved);
            if (saved) whitelist.value = JSON.parse(saved);
        } catch (error) {
            console.error(error.message);
            whitelist.value = [];
        }
    },
    async saveList() {
        try {
            await fetch("https://108armycadetunit.site/api/images", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "updatedContent": whitelist.value
                }
            })
        } catch (error) {
            console.error(error.message);
        }
    },
    isWhitelisted(imageName) {
        return whitelist.value.some(item => item.name === imageName);
    },
    toggleList(imageName) {
        const index = whitelist.value.findIndex(item => item.name === imageName);
        if (index === -1) {
            // Add the image object to the whitelist
            const imageObj = {
                path: `../assets/img/${imageName}`,
                url: `/src/assets/img/${imageName}`,
                name: imageName
            };
            whitelist.value.push(imageObj);
        } else {
            whitelist.value.splice(index, 1); // Remove the image object from the whitelist
        }
        this.saveList();
    },
    whitelist
};

export default GalleryService;
