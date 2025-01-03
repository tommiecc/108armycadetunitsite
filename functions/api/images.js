export async function onRequest(context) {
    try {
        const { env, request } = context;

        if (context.request.method === "GET") {
            const images = await env.info.get("images");
            
            return new Response(JSON.stringify({
                images: images
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else if (request.method === "POST") {
            const data = await request.json();
            const updatedContent = data['content'];
            
            if (!updatedContent) {
                return new Response(JSON.stringify({
                    message: "Missing content in request body"
                }), {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }

            await env.info.put("images", updatedContent);
            
            return new Response(JSON.stringify({
                message: "Successfully updated images"
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    } catch (error) {
        console.error('API error:', error);
        return new Response(JSON.stringify({
            message: error.message || "An unexpected error occurred"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}