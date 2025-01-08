export async function onRequest(context) {
    try {
        const { env, request } = context;

        if (context.request.method === "GET") {
            const files = await env.info.get("files");
            
            return new Response(JSON.stringify({
                files: files
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

            await env.info.put("files", updatedContent);
            
            return new Response(JSON.stringify({
                message: "Successfully updated files"
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