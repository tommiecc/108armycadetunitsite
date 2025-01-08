import VueCookies from 'vue-cookies'

const AUTH_COOKIE_NAME = 'auth_status'

VueCookies.config('1h');

const AuthStoreService = {
    login(admin) {
        const authData = {
            isLoggedIn: true,
            isAdmin: admin
        }
        VueCookies.set(AUTH_COOKIE_NAME, authData);
    },

    logout() {
        VueCookies.remove(AUTH_COOKIE_NAME);
    },

    isLoggedIn() {
        const authData = VueCookies.get(AUTH_COOKIE_NAME);
        return authData?.isLoggedIn === true;
    },

    isAdmin() {
        const authData = VueCookies.get(AUTH_COOKIE_NAME);
        return authData?.isAdmin === true;
    },

    getAuthData() {
        return VueCookies.get(AUTH_COOKIE_NAME) || null;
    }
}

export default AuthStoreService;