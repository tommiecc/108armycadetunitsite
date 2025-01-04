export async function onRequest(context) {
    try {
        const { env } = context;

        const token = env.passwordCheck.get('github');

        return new Response(JSON.stringify({
            token: token
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
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