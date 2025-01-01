<script setup>
import { onMounted, ref } from 'vue'

const messages = [
    "Polishing keepers",
    "Finalising orders",
    "Setting bearings",
    "Applying cam-cream",
    "Calling 0A",
];

const currMessage = ref(""); // Use ref to make it reactive
let messageIndex = 0;

const cycleMessages = () => {
    setInterval(() => {
        currMessage.value = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length; // Loop back to the start
    }, 2000);
};

onMounted(() => {
    currMessage.value = messages[messageIndex+1];
    cycleMessages();
})
</script>

<template>
    <div class="flex flex-col justify-center items-center py-72">
        <div class="p-2">
            <span class="loading loading-spinner text-[#c4a000] loading-lg"></span>
        </div>
        <div class="p-2">
            <p class="text-black">{{ currMessage }}</p>
        </div>
    </div>
</template>
