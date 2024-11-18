<template>
  <div id="app" class="min-h-screen bg-blue-50">
    <router-view></router-view>
    <notification-component />
  </div>
</template>

<script>
import NotificationComponent from './components/NotificationComponent.vue'

export default {
  name: 'App',
  components: {
    NotificationComponent
  }
}
</script>