<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(step, index) in steps" 
           :key="index" 
           class="w-full aspect-square transition-all duration-300 ease-in-out"
           :class="{
             'bg-[#1a3409] text-white': currentStep === index,
             'bg-white border-2 border-[#1a3409] text-[#1a3409]': currentStep !== index
           }">
        <div class="h-auto p-6 flex flex-col relative">
          <!-- Step Number -->
          <div class="text-2xl font-bold mb-4"
               :class="{ 'text-[#c4a000]': currentStep !== index }">
            Step {{ index + 1 }}
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-semibold mb-3">
            {{ step.title }}
          </h3>
          
          <!-- Content -->
          <p class="text-sm">
            {{ step.content }}
          </p>
          
          <!-- Arrow -->
          <div v-if="index < steps.length - 1" 
               class="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 text-2xl text-[#c4a000]">
            →
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationFlow',
  data() {
    return {
      currentStep: 0,
      intervalId: null,
      steps: [
        {
          title: 'Apply',
          content: 'Fill out the application form and respond to the questionnaire.'
        },
        {
          title: 'Endorsement',
          content: 'Send your application to an NGO that reflects your interests. The NGO will forward your application to the panel.'
        },
        {
          title: 'Interview',
          content: 'You will complete an in-person interview with staff and senior cadets. In the interview, you will have to answer some questions and deliver a 1-2 minute presentation.'
        },
        {
          title: 'Decision',
          content: 'You will be notified of the outcome of your application. You may be required to attend a Leadership Instruction Course before you are promoted.'
        }
      ]
    }
  },
  methods: {
    nextStep() {
      this.currentStep = (this.currentStep + 1) % this.steps.length;
    },
    startAutoAdvance() {
      this.intervalId = setInterval(this.nextStep, 3000); // Advance every 3 seconds
    },
    stopAutoAdvance() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.startAutoAdvance();
  },
  beforeUnmount() {
    this.stopAutoAdvance();
  }
}
</script>