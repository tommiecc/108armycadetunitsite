import bcrypt from 'bcryptjs'

/*

PAYLOAD:
{
    "user-input": <string>
}

*/

export async function onRequest(context) {
    try {

        const { request, env } = context;
        const data = await request.json();

        if (!checkValidPayload(data)) return responseHandler(400, "Invalid Input Format", null);
        
        const userInput = data['user-input'];

        const passHash = await env.passwordCheck.get('passcode');
        const adminHash = await env.passwordCheck.get('admin');

        const isCorrectPass = await bcrypt.compare(userInput, passHash);
        const isCorrectAdminPass = await bcrypt.compare(userInput, adminHash);

        if (isCorrectPass || isCorrectAdminPass) {
            return responseHandler(200, "Login Successful", isCorrectAdminPass);
        }

        return responseHandler(401, "Incorrect Login", null);

    } catch (exception) {
        return responseHandler(500, `Internal Server Error: ${exception.message}`, null)
    }
}


function responseHandler(statusCode, messageStr, isAdmin) {
    return JSON.stringify({
        status: statusCode,
        isAdmin: isAdmin,
        message: messageStr,
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
