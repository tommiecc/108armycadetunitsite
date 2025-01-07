export async function onRequest(context) {
    try {
        const { request, env } = context;

        // Preflight request handling
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400',
                    'Access-Control-Allow-Credentials': 'true'
                }
            });
        }

        /*Security Checks
        const checkedUrls = [
            "https://108armycadetunit.site/auth/authLogin",
            "https://108armycadetunit.site/auth/changePass",
            "https://108armycadetunit.site/auth/github",
        ]
        if (checkedUrls.includes(request.url)) {
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
        }
            */

        // handle request

        const response = await context.next();


        // Add CORS headers to actual response
        const corsHeaders = {
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
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
                'Access-Control-Allow-Credentials': 'true',
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
    const rateLimitKey = new URL(`https://108armycadetunit.site/ratelimit/${ip}`);

    const currCount = await cache.match(rateLimitKey);
    if (currCount && parseInt(await currCount.text()) > 100) {
        return {
            valid: false,
            error: 'Rate limit exceeded',
            code: 'RATE_LIMIT_EXCEEDED',
            status: 429
        };
    }

    // If not rate limited, you might want to increment the counter
    const newCount = (currCount ? parseInt(await currCount.text()) : 0) + 1;
    await cache.put(rateLimitKey, new Response(newCount.toString()), {
        expirationTtl: 86400
    });

    return { valid: true };


}