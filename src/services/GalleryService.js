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
            if (saved.images !== '') whitelist.value = saved.images;
            whitelist.value = [];
        } catch (error) {
            console.error(error);
            whitelist.value = [];
        }
    },
    async saveList() {
        try {
            const res = await fetch("https://108armycadetunit.site/api/images", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": String(whitelist.value)
                })
            })
            if (res.status !== 200) {
                console.error(await res.text());
            }
        } catch (error) {
            console.error(error.message);
        }
    },
    isWhitelisted(imageName) {
        return whitelist.value.some(item => item.name === imageName);
    },
    toggleList(imageName) {
        const index = whitelist.value.findIndex(item => item.name === imageName);
        if (index !== -1) {
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
