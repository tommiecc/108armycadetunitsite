export async function onRequest(context) {
    try {
        if (context.request.method === "GET") {
            const images = await context.env.info.get("images");

            return new Response(JSON.stringify({
                images: images
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            const data = await context.request.json();
            const updatedContent = data["content"];
            if (updatedContent) context.env.info.put("images", updatedContent);
        }
    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}