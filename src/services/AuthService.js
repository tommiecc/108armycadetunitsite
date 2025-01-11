import { useSecureApi } from '@/utils/useSecureApi'

const { makeRequest, error, loading } = useSecureApi('/auth');

const AuthService = {
    async checkLogin(userInput) {
        try {
            const data = await makeRequest('/authLogin', {
                method: 'POST',
                body: JSON.stringify({
                    "user-input": userInput
                })
            });

            return {
                "status": data.status,
                "data": data
            }
        } catch (exception) {
            return exception.message;
        }
    }
};

export default AuthService;