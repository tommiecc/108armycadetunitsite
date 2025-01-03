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
        } else if (context.request.method === "POST") {
            const data = await context.request.json();
            const updatedContent = data["content"];
            
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

            // Ensure we're storing a string in KV
            const contentString = typeof updatedContent === 'object' 
                ? JSON.stringify(updatedContent) 
                : String(updatedContent);

            await context.env.info.put("images", contentString);
            
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