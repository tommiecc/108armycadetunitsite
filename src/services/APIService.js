

const APIService = {
    async readData(element) {
        const BASE_URL = "https://108armycadetunit.site/api/readedit";
        const res = fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "read": true,
                "element": element,
                "updatedContent": null,
            })
        }); 

        console.log(res);

        return null;
    }
};

export default APIService;