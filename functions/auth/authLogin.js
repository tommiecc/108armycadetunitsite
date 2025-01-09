import bcrypt from 'bcryptjs';

/*
PAYLOAD:
{
    "user-input": <string>
}
*/

export async function onRequest(context) {
    try {
        const { request, env } = context;

        // Fast-fail with invalid payload
        if (!request.headers.get('Content-Type')?.includes('application/json')) {
            return responseHandler(400, "Invalid Content-Type", null);
        }

        const data = await request.json();
        
        if (!checkValidPayload(data)) {
            return responseHandler(400, "Invalid Input Format", null);
        }

        const userInput = data['user-input'];

        // Parallelize KV reads
        const [passHash, adminHash] = await Promise.all([
            env.passwordCheck.get('passcode'),
            env.passwordCheck.get('admin')
        ]);

        // Only compare against admin hash if it matches the regular password hash
        // This reduces bcrypt operations in most cases
        const isCorrectPass = await bcrypt.compare(userInput, passHash);
        
        if (isCorrectPass) {
            const isAdmin = await bcrypt.compare(userInput, adminHash);
            return responseHandler(200, "Login Successful", isAdmin);
        }

        return responseHandler(401, "Incorrect Login", null);

    } catch (exception) {
        // Don't expose internal error messages to client
        console.error(exception);
        return responseHandler(500, "Internal Server Error", null);
    }
}

function responseHandler(statusCode, messageStr, isAdmin) {
    return new Response(JSON.stringify({
        isAdmin,
        message: messageStr,
    }), {
        status: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
    });
}

function checkValidPayload(data) {
    return (
        data &&
        typeof data === 'object' &&
        'user-input' in data &&
        typeof data['user-input'] === 'string' &&
        data['user-input'].length > 0
    );
}