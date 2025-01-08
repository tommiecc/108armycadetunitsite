<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
            <h1 class="text-xl font-bold text-gray-700">403</h1>
            <p class="mt-4 text-4xl font-medium text-green-800 font-semibold">Access Forbidden (Location Disallow)</p>
            <p class="mt-2 text-gray-500">
                To protect against bots and malicious traffic, we block traffic that does not come from Australia. <br>
                If you believe you have been blocked in error try disabling your VPN (if you have one) or contact the <a class="font-semibold hover:text-green-800"href="mailto:siteadministrator@108armycadetunit.site">site administrator</a>
            </p>
        </div>
    </div>
</template>