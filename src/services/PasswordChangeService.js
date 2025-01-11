import { useSecureApi } from "@/utils/useSecureApi";
import AuthService from "./AuthService";

const { makeRequest, error, loading } = useSecureApi('/auth')

const PasswordChangeService = {
    async changePass(oldPass, newPass) {
        const checkAuth = await AuthService.checkLogin(oldPass);
        if (!(checkAuth.status === 200 && checkAuth.data.message === "Login Successful")) {
            return checkAuth.data;
        }

        if (checkAuth.data.isAdmin) {
            return "Please enter current members password. Not admin password.";
        }

        try {
            const data = await makeRequest('/changepass', {
                method: 'POST',
                body: JSON.stringify({
                    'is-admin': true,
                    'is-logged-in': true,
                    'user-input': newPass
                })
            });

            return {
                "status": data.status,
                "data": data
            };
        } catch (exception) {
            return exception.message;
        }
    }
}

export default PasswordChangeService;