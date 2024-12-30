const URL = "https://108armycadetunit.site/auth/authLogin"

const AuthService = {
    async checkLogin(userInput) {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user-input": userInput
                })
            });
    
            const data = await response.json();

            return {
                "status": response.status,
                "data": data
            }
        } catch (exception) {
            return exception.message;
        }
    }
};

export default AuthService;