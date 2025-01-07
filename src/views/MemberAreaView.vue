<script setup>
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import TurndownService from 'turndown'
import showdown from 'showdown'
import GalleryEditComponent from '@/components/GalleryEditComponent.vue'
import AuthStoreService from '@/services/AuthStoreService'

const isAdmin = ref(true);
const activeTab = ref('tab1');

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

const grabAndFill = (filename) => {
  return;
}

const checkAdmin = () => {
  if (!AuthStoreService.isAdmin()) isAdmin.value = false;
}

onMounted(() => {
  grabAndFill("marquee");
  checkAdmin();
})



</script>

<template>
  <button @click="AuthStoreService.logout()">Logout</button>
  <div id="memberSpace" v-if="!isAdmin">

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
            <div v-if="activeTab === 'tab3'">Members</div>
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
</template>



