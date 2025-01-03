export async function onRequest(context) {
    try {
        const { request } = context;

        // Security Checks

        const securityCheck = await validateRequest(request, env);
        if (!securityCheck.valid) {
            return new Response(JSON.stringify({
                error: securityCheck.error,
                code: securityCheck.code,
            }), {
                status: securityCheck.status || 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }


        // Handling of request

        const origin = request.headers.get('Origin');

        // Preflight request handling
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': origin,
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400',
                    'Access-Control-Allow-Credentials': 'true'
                }
            });
        }

        const response = await context.next();

        // Add CORS headers to actual response
        const corsHeaders = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true'
        };

        const newResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                ...Object.fromEntries(response.headers),
                ...corsHeaders
            }
        });

        return newResponse;

    } catch (error) {
        console.error('Middleware error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });
    }
}

async function validateRequest(request, env) {
    // Check HTTP methods
    const allowedMethods = ['GET', 'POST', 'OPTIONS'];
    if (!allowedMethods.includes(request.method)) {
        return {
            valid: false,
            error: 'Method not allowed',
            code: 'METHOD_NOT_ALLOWED',
            status: 405
        };
    }

    // Origin Validation
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
        "https://108armycadetunit.site",
        "http://localhost:5173"
    ];

    if (!origin || !allowedOrigins.includes(origin)) {
        return {
            valid: false,
            error: 'Invalid origin',
            code: 'INVAILD_ORIGIN',
            status: 403
        };
    }

    // Ref validation
    const referrer = request.headers.get('Referer');
    if (!referrer || !allowedOrigins.some(origin => referrer.startsWith(origin))) {
        return {
            valid: false,
            error: 'Invalid referrer',
            code: 'INVALID_REFERRER',
            status: 403
        };
    }

    // CSRF validation
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (!csrfToken) {
        return {
            valid: false,
            error: 'Missing CSRF token',
            code: 'MISSING_CSRF',
            status: 403
        }
    }


    // rate limiter
    const cache = caches.default;
    const ip = request.headers.get("CF-Connecting-IP");
    const rateLimitKey = `ratelimit:${ip}`;

    const currCount = await cache.match(rateLimitKey);
    if (currCount && parseInt(currCount.text()) > 100) {
        return new Response('Rate limit exceeded', { statusText: 429 });
    }


}