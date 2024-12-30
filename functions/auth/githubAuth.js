export async function onRequest(context) {
    return new Response(JSON.stringify({
        token: context.env.passwordCheck.get('githubAccessToken'),
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
}