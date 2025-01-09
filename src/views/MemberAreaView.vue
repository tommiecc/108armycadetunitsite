<script setup>
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import TurndownService from 'turndown'
import showdown from 'showdown'
import GalleryEditComponent from '@/components/GalleryEditComponent.vue'
import AuthStoreService from '@/services/AuthStoreService'
import PromotionComponent from '@/components/PromotionComponent.vue'
import DownloadsEditComponent from '@/components/DownloadsEditComponent.vue'
import DownloadsComponent from '@/components/DownloadsComponent.vue'
import PromotionsService from '@/services/PromotionsService.js'

const isAdmin = ref(null);
const promotionsActive = ref(null);
const activeTab = ref('tab1');
const sidebar = ref(null);


let marqueeContent = ref('');

const contents = {  "marquee": marqueeContent };

const tabClicked = (tabId) => {
  activeTab.value = tabId;
}

const updateMarquee = () => {
  const content = contents["marquee"].value;
  const converter = new showdown.Converter();

  const items = content.split(" • ");
  let joinedHtml = "";

  // convert each item to HTML
  for (let i = 0; i < items.length; i++) {
    let html = converter.makeHtml(items[i]);
    html = html.concat("<p>•</p>");
    joinedHtml = joinedHtml.concat(html);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(joinedHtml, "text/html");

  const pElement = doc.querySelectorAll('p');

  // replace p elements with span and add styles
  pElement.forEach(p => {
    const span = doc.createElement('span');
    span.innerHTML = p.innerHTML;
    span.classList.add("marquee-item", "px-2");

    // replace p with span
    p.replaceWith(span);
  });

  const a = doc.querySelector('a');
  if (a) {
    a.classList.add("text-green-900", "font-semibold", "hover:text-white", "hover:scale-150");
  }
}

const togglePromotions = () => {
  PromotionsService.toggle(!promotionsActive);
  loadPromotions();
}

const loadPromotions = () => {
  promotionsActive.value = PromotionsService.load();
  if (promotionsActive.value === null) console.error("Error");
}

const grabAndFill = (filename) => {
  return;
}

const checkAdmin = () => {
  if (AuthStoreService.isAdmin()) isAdmin.value = true;
  else isAdmin.value = false;
}

const logout = () => {
  AuthStoreService.logout();
  window.location.reload();
}

onMounted(() => {
  grabAndFill("marquee");
  checkAdmin();
  loadPromotions();
})



</script>

<template>
  <div class="flex flex-col">
    <div id="memberSpace" v-if="!isAdmin">
      <div class="py-2">
        <div class="w-full bg-[#1a3409]">
          <h3 class="text-white font-bold text-3xl p-2">Member Only Space</h3>
        </div>
      </div>
      <main class="flex px-2 gap-4 flex-wrap">
        <div class="w-1/5 rounded-lg shadow-md flex-none">
          <div class="text-xl font-medium p-2 text-black">Quick Links</div>
          <div>
            <ul class="menu menu-vertical rounded-box">
              <li class="mb-4 text-black">
                <a href="#log-absences" class="block px-4 rounded hover:bg-[#c4a000] hover:text-white hover:font-semibold">Log Absences</a>
              </li>
              <li class="mb-4 text-black">
                <a href="#apply-promotion" class="block px-4 rounded hover:bg-[#c4a000] hover:text-white hover:font-semibold">Apply for Promotion</a>
              </li>
              <li class="mb-4 text-black">
                <a href="#download-resources" class="block px-4 rounded hover:bg-[#c4a000] hover:text-white hover:font-semibold">Download Resources</a>
              </li>
            </ul>
          </div>
        </div>
        <section class="bg-white shadow-md rounded-lg w-3/4" id="log-absences">
          <div class="p-2">
            <h2 class="text-2xl font-semibold mb-4 text-black">Log Absences</h2>
            <p class="text-gray-600 mb-4">Fill out the form below to log your absence.</p>
            <div class="relative overflow-hidden rounded-md">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScTes3h7b3SNXSDwIIqUtfqrmoTufQpEH7JBh-e-U-C3B62Mg/viewform?embedded=true"
                width="100%"
                height="500"
                frameborder="0"
                class="w-full"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>

        <section class="bg-white shadow-md rounded-lg w-full" id="apply-promotion">
          <div class="p-2 flex flex-wrap">
            <h2 class="text-2xl font-semibold mb-4 text-black w-full flex-none">Apply for Promotion</h2>
            <div v-if="promotionsActive" class="p-2">
              <button class="w-full p-4 bg-[#1a3409] rounded-lg shadow-md text-white text-xl hover:bg-[#c4a000] hover:scale-105">
                Submit your application now!
              </button>
              <PromotionComponent />
              <div class="text-black">
                Application forms can be downloaded from the downloads section under 'Promotions.'
              </div>
            </div>
            <div v-if="!promotionsActive" class="p-6">
              <p>Unfortunately applications are currently closed. Please check back later.</p>
            </div> 
          </div>
        </section>

        <section class="bg-white shadow-md rounded-lg p-6 w-full" id="download-resources">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Download Resources</h2>
          <DownloadsComponent />
        </section>
      </main>
    </div>
    <div id="adminSpace" v-if="isAdmin">
      <div class="py-2">
        <div class="w-full bg-[#1a3409]">
          <h3 class="text-white font-bold text-3xl p-2">Admin Only Space</h3>
        </div>
      </div>
      <main class="flex px-2">
          <div class="bg-gray-50 w-64 p-4 rounded-lg shadow-sm max-h-90">
            <ul class="space-y-2">
                <li>
                    <button 
                        @click="tabClicked('tab1')" 
                        :class="[
                            'w-full text-left px-4 py-2 rounded-md transition-colors duration-150',
                            activeTab === 'tab1' 
                                ? 'bg-[#1a3409] text-white font-medium' 
                                : 'text-gray-600 hover:bg-[#c4a000] hover:text-white'
                        ]"
                    >
                        Edit About Page
                    </button>
                </li>
                <li>
                    <button 
                        @click="tabClicked('tab2')"
                        :class="[
                            'w-full text-left px-4 py-2 rounded-md transition-colors duration-150',
                            activeTab === 'tab2' 
                                ? 'bg-[#1a3409] text-white font-medium' 
                                : 'text-gray-600 hover:bg-[#c4a000] hover:text-white'
                        ]"
                    >
                        Edit Gallery Page
                    </button>
                </li>
                <li>
                    <button 
                        @click="tabClicked('tab3')"
                        :class="[
                            'w-full text-left px-4 py-2 rounded-md transition-colors duration-150',
                            activeTab === 'tab3' 
                                ? 'bg-[#1a3409] text-white font-medium' 
                                : 'text-gray-600 hover:bg-[#c4a000] hover:text-white'
                        ]"
                    >
                        Edit Members Area
                    </button>
                </li>
                <li>
                    <button 
                        @click="tabClicked('tab4')"
                        :class="[
                            'w-full text-left px-4 py-2 rounded-md transition-colors duration-150',
                            activeTab === 'tab4' 
                                ? 'bg-[#1a3409] text-white font-medium' 
                                : 'text-gray-600 hover:bg-[#c4a000] hover:text-white'
                        ]"
                    >
                        Edit Marquee
                    </button>
                </li>
                <li>
                    <button 
                        @click="tabClicked('tab5')"
                        :class="[
                            'w-full text-left px-4 py-2 rounded-md transition-colors duration-150',
                            activeTab === 'tab5' 
                                ? 'bg-[#1a3409] text-white font-medium' 
                                : 'text-gray-600 hover:bg-[#c4a000] hover:text-white'
                        ]"
                    >
                        Change Password
                    </button>
                </li>
            </ul>
        </div>
          <div class="px-2 max-w-3/5">
              <div v-if="activeTab === 'tab1'">
                <h4 class="text-black text-xl font-semibold text-balance py-2">Edit About Page</h4>
                <p>
                  You can edit the 'About Page' by entering markdown into the box below. 
                  You can insert images by uploading them and inserting them as 'example.png', 'example.jpg', etc.
                  <br>
                  You can learn more about markdown <a href="" target="_blank" class="text-[#1a3409] font-semibold hover:text-[#c4a000]">here</a>.
                </p>
              </div>
              <div v-if="activeTab === 'tab2'">
                <h4 class="text-black text-xl font-semibold text-balance py-2">Edit Gallery</h4>
                <GalleryEditComponent />
              </div>
              <div v-if="activeTab === 'tab3'">
                <h4 class="text-black text-xl font-semibold text-balance py-2">Edit Members Area</h4>
                <div class="container mx-auto px-4 py-8">
                  <div class="mb-8 bg-white rounded-lg shadow-md p-6 flex flex-wrap flex-col">
                    <h2 class="text-2xl font-semibold mb-4 flex-none">Open/Close promotions</h2>
                    <button
                      @click="togglePromotions()"
                      class="p-2 rounded-lg shadow-md text-white hover:scale-105"
                      :class="{ 'bg-[#1a3409]': !promotionsActive, 'bg-red-800': promotionsActive }"
                    >
                      <span v-if="promotionsActive">Close Promotions</span>
                      <span v-if="!promotionsActive">Open Promotions</span>
                    </button>
                  </div>
                </div>
                <DownloadsEditComponent />
              </div>
              <div v-if="activeTab === 'tab4'">
                <h4 class="text-black text-xl font-semibold text-balance py-2">Edit Marquee</h4>
                <p>
                  You can edit the marquee by entering markdown into the box below. Each item is ended with a "•" symbol.
                  <br>
                  You can learn more about markdown <a href="" target="_blank" class="text-[#1a3409] font-semibold hover:text-[#c4a000]">here</a>.
                </p>
                <br>
                <div class="flex justify-center">
                  <textarea class="textarea textarea-bordered bg-white border-black w-full textarea-s text-black" v-model="marqueeContent"></textarea>
                </div>
                <div class="flex float-right p-2">
                  <button class="bg-[#1a3409] text-white w-full text-left px-4 py-2 rounded-md transition-colors duration-150 hover:bg-[#c4a000]" @click="updateMarquee()">Save Changes</button>
                </div>
              </div>
              <div v-if="activeTab === 'tab5'">Password</div>
          </div>
      </main>
    </div>
    <div class="self-end p-4">
       <div class="shadow-md rounded-lg p-2 hover:scale-105">
        <button @click="logout()" class="bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 56 56" xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> 
              <g> 
                <path d="M54.424,28.382c0.101-0.244,0.101-0.519,0-0.764c-0.051-0.123-0.125-0.234-0.217-0.327L42.208,15.293 c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L51.087,27H20.501c-0.552,0-1,0.447-1,1s0.448,1,1,1h30.586L40.794,39.293 c-0.391,0.391-0.391,1.023,0,1.414C40.989,40.902,41.245,41,41.501,41s0.512-0.098,0.707-0.293l11.999-11.999 C54.299,28.616,54.373,28.505,54.424,28.382z"/> 
                <path d="M36.501,33c-0.552,0-1,0.447-1,1v20h-32V2h32v20c0,0.553,0.448,1,1,1s1-0.447,1-1V1c0-0.553-0.448-1-1-1h-34 c-0.552,0-1,0.447-1,1v54c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V34C37.501,33.447,37.053,33,36.501,33z"/> 
              </g> 
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
 .break {
  flex-basis: 100%;
  height: 0;
 }

</style>



