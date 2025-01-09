<template>
  <div class="min-w-full">
    <img src="../assets/img/respect.jpg" alt="Cadets on a field exercise">
  </div>

  <div class="min-w-full bg-[#1a3409] text-left text-white">
    <h2 class="text-3xl font-bold p-2">For visitors...</h2>
  </div>

  <p class="text-black p-2 invisible md:visible xl:invisible">
    Scroll right to see more...
  </p>
  <div class="flex justify-between flex-col md:flex-row px-4 items-center gap-4 overflow-scroll">
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/service.jpg"
            alt="Cadets at an ANZAC day service" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">About Us</h2>
          <p class="text-white">
            Since its establishment in July 2022, 108 Army Cadet Unit has grown from just 15 cadets and a few staff to over 40 with a dedicated team of volunteer staff.
          </p>
          <div class="card-actions justify-end">
            <a href="/about" class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all">Read More</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/integrity.jpg"
            alt="Cadets participating in a VCP (vehicle checkpoint)" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">Gallery</h2>
          <p class="text-white">
            From field exercies to community service, we pretty much do it all. Have a look at what we do at 108 ACU and how we do it...
          </p>
          <div class="card-actions justify-end">
            <a href="/about" class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all">Take me there!</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/parade.jpg"
            alt="Cadets on parade" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">Join our unit!</h2>
          <p class="text-white">
            The Australian Army Cadets is the largest youth development organisation in Australia with thousands of members across the country.
            So why not join today!
          </p>
          <div class="card-actions justify-end">
            <a href="https://www.armycadets.gov.au/find-a-unit/unit?ua=108ACU" target="_blank" class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all">Join  Now!</a>
          </div>
        </div>
      </div>
    </div>
    
  </div>

  <br>

  <div class="min-w-full bg-[#1a3409] text-left text-white">
    <h2 class="text-3xl font-bold p-2">For Cadets and Staff...</h2>
  </div>

  <p class="text-black p-2 invisible md:visible xl:invisible">
    Scroll right to see more...
  </p>

  <div class="flex justify-between flex-col md:flex-row px-4 items-center gap-4 overflow-scroll">
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 max-h shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/dining.jpg"
            alt="Cadets at a unit dining in night" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">Members Only Area</h2>
          <p class="text-white">
            Login into the members only area...
          </p>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70">
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd" />
            </svg>
            <input type="password" id="passwordInput" class="grow max-w-32"/>
          </label>
          <div class="card-actions justify-end">
            <button class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all" @click="authChallenge()">Log In</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/starsafari2.jpg"
            alt="Cadets on Ex Starlight Safari 2024" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">Log absence</h2>
          <p class="text-white">
            If you're not going to be able to attend a parade night, please log your absence using the button below (requires login to members area).
          </p>
          <div class="card-actions justify-end">
            <a href="/membersOnly#log-absence" class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all">Log an absence</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card bg-base-100 image-full w-72 min-h-80 shadow-xl hover:scale-105">
        <figure>
          <img
            src="@/assets/img/anzac1.jpg"
            alt="Cadets at an ANZAC day service" />
        </figure>
        <div class="card-body bg-black bg-opacity-40 rounded-2xl">
          <h2 class="card-title text-white">Access Downloads</h2>
          <p class="text-white">
            Access links to download important documents... (requires login to members area)
          </p>
          <div class="card-actions justify-end">
            <a href="/membersOnly#download-resources" target="_blank" class="text-white bg-[#1a3409] p-4 rounded-lg hover:bg-[#c4a000] hover:border-[#c4a000] hover:scale-105 transition-all">Go</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialog id="alert_modal" class="modal">
    <div class="modal-box bg-gray-200">
      <h3 class="text-lg font-bold text-[#1a3409]">Error!</h3>
      <p class="py-4 text-black">
        Oops! Something has gone wrong... try entering your password again (it may be wrong). 
        <br>
        If that fails, please try again later or contact the <a href="mailto:siteadministrator@108armycadetunit.site" class="font-semibold text-[#1a3409] hover:scale-105 hover:text-[#c4a000]">site administrator</a>.
      </p>
      <div class="modal-action">
        <form method="dialog">
          <button class="p-4 rounded-lg bg-[#1a3409] text-white hover:bg-[#c4a000] hover:scale-105">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <br>


</template>


<script setup>
  import AuthService from '@/services/AuthService'
  import AuthStoreService from '@/services/AuthStoreService'
  import { ref } from 'vue'
  import router from '@/router/index'

  const isLoading = ref(false);

  const authChallenge = async () => {
    isLoading.value = true;
    let userInput = document.getElementById("passwordInput").value;
    const res = await AuthService.checkLogin(userInput);
    if (res.status === 200) {
      AuthStoreService.login(res.data.isAdmin);
      isLoading.value = false;
      router.push('/membersOnly');
    } else {
      console.error(res);
      document.getElementById("alert_modal").showModal();
    }
  }
</script>
