<template>
  <div class="w-full rounded-lg shadow-md">
    <!-- Form -->
    <form class="space-y-6 p-2" @submit.prevent="handleSubmit">
      <!-- Current Password -->
      <div>
        <label for="current-password" class="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div class="mt-1 relative">
          <input
            :type="showCurrentPassword ? 'text' : 'password'"
            id="current-password"
            v-model="currentPassword"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 bg-white border border-[#1a3409] text-black focus:outline-none focus:ring-[#c4a000] focus:border-[#c4a000] focus:z-10 sm:text-sm"
          />
          <button
            type="button"
            @click="showCurrentPassword = !showCurrentPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span class="text-sm text-gray-500">
              {{ showCurrentPassword ? 'Hide' : 'Show' }}
            </span>
          </button>
        </div>
      </div>

      <!-- New Password -->
      <div>
        <label for="new-password" class="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div class="mt-1 relative">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            id="new-password"
            v-model="newPassword"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 bg-white border border-[#1a3409] text-black focus:outline-none focus:ring-[#c4a000] focus:border-[#c4a000] focus:z-10 sm:text-sm"
          />
          <button
            type="button"
            @click="showNewPassword = !showNewPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span class="text-sm text-gray-500">
              {{ showNewPassword ? 'Hide' : 'Show' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Confirm New Password -->
      <div>
        <label for="confirm-password" class="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <div class="mt-1 relative">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirm-password"
            v-model="confirmPassword"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 bg-white border border-[#1a3409] text-black focus:outline-none focus:ring-[#c4a000] focus:border-[#c4a000] focus:z-10 sm:text-sm"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span class="text-sm text-gray-500">
              {{ showConfirmPassword ? 'Hide' : 'Show' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Password Requirements -->
      <div class="space-y-2">
        <p class="text-sm font-medium text-gray-700">Password must contain:</p>
        <ul class="text-sm text-gray-600 space-y-1">
          <li class="flex items-center" :class="{ 'text-green-600': hasMinLength }">
            <span class="mr-2">{{ hasMinLength ? '✓' : '○' }}</span>
            At least 8 characters
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasUpperCase }">
            <span class="mr-2">{{ hasUpperCase ? '✓' : '○' }}</span>
            One uppercase letter
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasLowerCase }">
            <span class="mr-2">{{ hasLowerCase ? '✓' : '○' }}</span>
            One lowercase letter
          </li>
          <li class="flex items-center" :class="{ 'text-green-600': hasNumber }">
            <span class="mr-2">{{ hasNumber ? '✓' : '○' }}</span>
            One number
          </li>
        </ul>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-red-800 text-white text-sm">
        {{ error }}
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="!isValid"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a3409] hover:bg-[#c4a000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c4a000] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>

  <dialog id="alert_modal" class="modal">
    <div class="modal-box bg-gray-200">
      <h3 class="text-lg font-bold text-[#1a3409]">Password changed successfully to: {{ newPassword }}</h3>
      <div class="modal-action">
        <form method="dialog">
          <button class="p-4 rounded-lg bg-[#1a3409] text-white hover:bg-[#c4a000] hover:scale-105">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import PasswordChangeService from '@/services/PasswordChangeService'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')

const isLoading = ref(false);

const hasMinLength = computed(() => newPassword.value.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(newPassword.value))
const hasLowerCase = computed(() => /[a-z]/.test(newPassword.value))
const hasNumber = computed(() => /\d/.test(newPassword.value))
const isValid = computed(() => 
  hasMinLength.value &&
  hasUpperCase.value &&
  hasLowerCase.value &&
  hasNumber.value &&
  newPassword.value === confirmPassword.value &&
  currentPassword.value.length > 0
)

const handleSubmit = async () => {
  isLoading.value = true;
  if (!isValid.value) {
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New passwords do not match'
    return
  }

  const res = await PasswordChangeService.changePass(currentPassword, newPassword);
  console.log(res);
  if (res.data.message === "Changed password successfully") {
    document.getElementById("alert_modal").showModal();
  } else {
    error.value = res.message;
  }


  // Reset form
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  error.value = ''
}
</script>