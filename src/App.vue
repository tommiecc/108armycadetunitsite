<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div v-if="!isLocationDisallow">
    <div class="flex bg-white flex-wrap mx-auto py-10">
      <div class="float-left px-5">
        <img src="/img/logo.jpg" alt="AAC Logo" width=100 height=100>
      </div>
      <div class="justify-center items-center text-center">
        <h1 class="text-green-900 font-semibold text-3xl">
        108 Army Cadet Unit - Kemore
        </h1>

        <h3 class="text-green-900 font-semibold text-xl px-10">
        Courage - Respect - Integrity - Service - Excellence
        </h3>
      </div>
    </div>

    <nav class="flex flex-wrap mx-auto bg-green-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gallery</a>
            </li>
            <li>
              <a href="#" class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Members Only Area
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 64 64">
                  <!-- Lock body -->
                  <rect x="16" y="28" width="32" height="28" rx="4" ry="4" fill="14532D" stroke="currentColor" stroke-width="2"/>
                  <!-- Lock shackle -->
                  <path d="M32,12a12,12 0 0 1 12,12v4H20v-4a12,12 0 0 1 12-12z" fill="14532D" stroke="currentColor" stroke-width="2"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="float-right ">
          <a href="armycadets.gov.au" class="block btn py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Join Now!
          </a>
        </div>
      </div>
    </nav>


  </div>

  <RouterView />
</template>

<script>
export default {
  computed: {
    isLocationDisallow() {
      // Check the current route and decide if it's a standalone page
      return this.$route.path === "/LocationDisallow";
    },
  },
};
</script>