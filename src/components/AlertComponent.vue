<template>
  <div v-if="visible" role="alert" class="alert" :class="{ 'fade-out': fadingOut }" @click="fadeOut">
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
        fadingOut: false,
      };
    },
    methods: {
      show(message) {
        if (message) {
          this.$emit('update:message', message);
        }
        this.visible = true;
      },
      fadeOut() {
        this.fadingOut = true;
        setTimeout(() => {
          this.visible = false;
          this.fadingOut = false;
        }, 500);
      },
    },
  };
</script>

<style scoped>

.alert {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d70000;
  color: white;
  font-weight: bold;
  padding: 1rem;
  width: 100%;
  position: fixed;
  bottom: -100px; /* Start outside the viewport */
  left: 50%;
  transform: translateX(-50%);
  animation: floatUp 0.5s forwards;
  transition: opacity 0.5s;
}

.alert.fade-out {
  opacity: 0;
  transform: translateX(-50%) translateY(100px); /* Move back down during fade-out */
}

@keyframes floatUp {
  from {
    transform: translateX(-50%) translateY(100px); /* Start below the viewport */
  }
  to {
    transform: translateX(-50%) translateY(0); /* End at the bottom of the viewport */
  }
}
</style>
