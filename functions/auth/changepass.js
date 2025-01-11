import bcrypt from 'bcryptjs'

/*
PAYLOAD: 

{
    is-admin: <true/false>,
    is-logged-in: <true/false>,
    user-input: <string>
}

*/

export async function onRequest(context) {
    try {

        const { request, env } = context;
        const data = await request.json();

        if (!checkValidPayload(data)) return responseHandler(400, "Invalid Input Format", false);
        
        const {
            'is-admin': isAdmin,
            'is-logged-in': isLoggedIn,
            'user-input': userInput
        } = data

        if (!isLoggedIn) return responseHandler(401, "Unauthorised User", false);
        if (!isAdmin) return responseHandler(403, "User is forbidden", false);

        const salt = await bcrypt.genSalt(12);
        const newHash = await bcrypt.hash(userInput, salt);

        await env.passwordCheck.put('passcode', newHash);

        return responseHandler(200, "Changed password successfully", true);
    } catch (exception) {
        return responseHandler(500, `Internal Server Error: ${exception.message}`, false)
    }
}

function responseHandler(statusCode, messageStr, isSuccessful) {
    return new Response(JSON.stringify({
        success: isSuccessful,
        message: messageStr,
    }), {
        status: statusCode,
        headers: { "Content-Type": "application/json"  }
    });
}

function checkValidPayload(data) {
    return (
        typeof data === 'object' &&
        'is-admin' in data &&
        'is-logged-in' in data &&
        'user-input' in data &&
        typeof data['is-admin'] === 'boolean' &&
        typeof data['is-logged-in'] === 'boolean' &&
        typeof data['user-input'] === 'string' &&
        data['user-input'].length > 0
    )
}