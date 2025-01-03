<script setup>
  import AuthStoreService from '@/services/AuthStoreService'
  import AuthService from '@/services/AuthService'
  import AlertComponent from '@/components/AlertComponent.vue'
  import App from '@/App.vue'

  import { ref } from 'vue'
</script>

<template>
  <div class="max-w-md mx-auto my-10 p-8 bg-gray-50 border-2 border-[#1a3409] rounded-lg shadow-lg">
    <!-- Login Header -->
    <div class="text-center mb-6">
      <h2 class="text-[#1a3409] text-2xl font-bold">Members Area Login</h2>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Password Input -->
      <div>
        <label 
          for="password" 
          class="block mb-1 text-[#1a3409] font-bold"
        >
          Password
        </label>
        <input 
          type="password" 
          id="password" 
          placeholder="Enter your password"
          class="w-full px-3 py-2 border-2 bg-white border-[#2d4f0c] rounded focus:outline-none focus:border-[#c4a000] focus:ring-1 focus:ring-[#c4a000]"
        >
      </div>

      <!-- Login Button -->
      <button 
        type="submit"
        id="submitButton" 
        @click="authLogin"
        class="w-full py-3 px-4 bg-[#2d4f0c] hover:bg-[#4a7012] text-white font-bold rounded transition-colors duration-200"
      >Log In</button>

      <!-- Footer Links -->
      <div class="text-center text-sm space-y-2">
        <p class="text-gray-600">
          Need help? Contact the <a href="mailto:siteadministrator@108armycadetunit.site">site administrator</a>.
        </p>
      </div>
    </form>
  </div>

  <AlertComponent ref="alert"></AlertComponent>

</template>

<script>
export default {
  components: { AlertComponent },
  methods: {
    showAlert(message) {
      this.$refs.alert.show(message);
    },
    async authLogin() {
      let userInput = document.getElementById("password").value;

      const response = await AuthService.checkLogin(userInput);
      
      if (response.status === 200) {
        AuthStoreService.login(response.data.isAdmin);
        this.$router.push('/membersOnly');
      } else {
        try {
          this.showAlert(`${response.status} - ${response.data.message}`);
        } catch (exception) {
          this.showAlert(`500 - Internal Server Error`);
        }
      }
    }
  }
}

</script>
