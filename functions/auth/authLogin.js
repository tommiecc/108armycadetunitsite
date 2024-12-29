import bcrypt from 'bcryptjs'

/*

PAYLOAD:
{
    "user-input": <string>
}

*/

export async function onRequest() {
    try {

        const { request, env } = context;
        const data = await request.json();

        if (!checkValidPayload(data)) return responseHandler(400, "Invalid Input Format", null);
        
        const {
            'userInput': userInput
        } = data

        const passHash = env.checkPassword.get('passcode');
        const adminHash = env.checkPassword.get('admin');

        const isCorrectPass = bcrypt.compare(userInput, passHash);
        const isCorrectAdminPass = bcrypt.compare(userInput, adminHash);

        if (isCorrectPass || isCorrectAdminPass) {
            return responseHandler(200, "Login Successful", isCorrectAdminPass);
        }

        return responseHandler(401, "Incorrect Login", null);

    } catch (exception) {
        return responseHandler(500, `Internal Server Error: ${exception.message}`, null)
    }
}


function responseHandler(statusCode, messageStr, isAdmin) {
    return new Response(JSON.stringify({
        isAdmin: isAdmin,
        message: messageStr,
    }), {
        status: statusCode,
        headers: { "Content-Type": "application/json" }
    });
}

function checkValidPayload(data) {
    return (
        typeof data === 'object' &&
        'user-input' in data &&
        typeof data['user-input'] === 'string' &&
        data['user-input'].length > 0
    )
}