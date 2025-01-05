import { ref } from 'vue';

export function useSecureApi(baseURL) {
  const error = ref(null);
  const loading = ref(false);

  // Generate CSRF token on mount
  const csrfToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');

  const makeRequest = async (endpoint, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        ...options.headers
      };

      const response = await fetch(`https://108armycadetunit.site${baseURL}${endpoint}`, {
        ...options,
        headers,
        /* readd for final deployment
        credentials: 'same-origin',
        mode: 'same-origin',
        */
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Request failed');
      }

      return await response.json();
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    makeRequest
  };
}