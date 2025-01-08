export async function onRequest(context) {
    // Define CORS headers once to reuse
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    };

    // Define security headers separately
    const securityHeaders = {
        'Content-Security-Policy':
            [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https:",
                "connect-src 'self' https://108armycadetunit.site",
                "frame-src 'none'",
                "font-src 'self'"
            ].join('; ')
    };

    try {
        const { request, env } = context;

        // Preflight request handling
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders
            });
        }

        // Handle the main request
        const response = await context.next();

        // Create new response with all headers
        const newResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                ...Object.fromEntries(response.headers),
                ...corsHeaders,
                ...securityHeaders
            }
        });

        return newResponse;

    } catch (error) {
        console.error('Middleware error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    }
}