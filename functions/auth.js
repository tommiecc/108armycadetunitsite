const bcrypt = require('bcryptjs');

export function onRequest(context) {
    if (checkChange(context)) {
        try {
            const err = changePasscode(context);
            if (err == null) return new Response().status(200).json({ message: "Successfully Changed" });
            else return err;
        } catch (exception) {
            return new Response(`${exception.message}\n${exception,stack}`, { status: 500 });
        } 
    }

    try {
        const [success, isAdmin] = authenticationCheck(context);
        if (success) return new Response().status(200);
        if (isAdmin) return new Response().status(200).json({ message: "admin" });
        else return new Response().status(401);
    } catch (exception) {
        return new Response(`${exception.message}\n${exception.stack}`, { status: 500 });
    }
}

async function checkChange(context) {
    return await context.request.headers.get("change-pass");
}

async function changePasscode(context) {
    const isAuthed = await context.request.headers.get("is-admin");
    const isLoggedIn = await context.request.headers.get("is-logged-in");
    if (isAuthed) {
        const salt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(context.request.headers.get("new-pass"), salt);
        await context.env.cadetsPasses.put("passcode", hashedPass);
    } else if (isLoggedIn) {
        return new Response().status(403);
    } else {
        return new Response().status(401);
    }
}

async function authenticationCheck(context) {
    const password = await context.env.cadetsPasses.get("passcode");
    const adminPass = await context.env.cadetsPasses.get("admin");
    const userGiven = await context.request.headers.get("user-input");
    const isValid = await bcrypt.compare(userGiven, password);
    const isValidAdmin = await bcrypt.compare(userGiven, adminPass);
    if (isValid) {
        return [true, false];
    } else if (isValidAdmin) {
        return [true, true];
    } else {
        return [false, false];
    }
}