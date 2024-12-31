export async function onRequest(context) {
    const { request } = context;

    console.log(`Middleware OK for: ${request.url}`);

    const origin = request.headers.get('Origin');
    const userAgent = request.headers.get('User-Agent');

    if (userAgent && (
        userAgent.includes('curl') ||
        userAgent.includes('Postman') ||
        userAgent.includes('wget') ||
        userAgent.includes('HTTPie') ||
        userAgent.includes('python-requests')
    )) {
        return responseHandler(403, "User Agent Disallow", null);
    }

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400',
            }
        });
    }

    const response = await context.next();
    const newResponse = new Response(response.body, response);

    newResponse.headers.set('Access-Control-Allow-Origin', origin || '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    return newResponse;
}