

const APIService = {
    async readData(element) {
        const BASE_URL = "https://108armycadetunit.site/api";
        const res = fetch(BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "read": true,
                "element": element,
                "updatedContent": null,
            })
        });

        return await res.text();
    }
};

export default APIService;