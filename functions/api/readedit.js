/*
PAYLOAD:

{
    read: <true/false>,
    element: <"marquee" or "about">,
    updatedContent: <string or null>,
}

*/

async function readData(env, element) {
    try {
        const res = await env.info.get(element);
        const data = await res.text();

        return new Response(JSON.stringify({
            value: data,
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message,
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

async function writeData(env, element, updatedContent) {
    return null;
}


export async function onRequest(context) {
    try {
        const { env, req } = context;

        const data = await req.json();


        const {
            "read": read,
            "element": element,
            "updatedContent": updatedContent,
        } = data;


        if (read) return readData(env, element);
        return writeData(env, element, updatedContent);

    } catch(error) {
        return new Response(JSON.stringify({
            message: error.message,
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}