<template>
  <div v-if="visible" role="alert" class="w-full p-2 bg-red-800 text-white font-semibold justify-center flex" @click="hide">
    <div class="px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current justify-left"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <span>{{ message }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
        default: "500 - Internal Server Error"
      }
    },
    data() {
      return {
        visible: false,
        message: '',
      };
    },
    methods: {
      show(message) {
        if (message) {
          this.message = message;
        }
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
    },
  };
</script>
