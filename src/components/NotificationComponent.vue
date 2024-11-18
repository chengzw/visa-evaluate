<template>
  <transition name="notification">
    <div
      v-if="notification.show"
      :class="[
        'fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg max-w-md',
        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      <div class="flex items-center text-white">
        <span class="mr-2">
          <svg v-if="notification.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
        <span class="text-sm font-medium">{{ notification.message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NotificationComponent',
  computed: {
    ...mapState(['notification'])
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter,
.notification-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>