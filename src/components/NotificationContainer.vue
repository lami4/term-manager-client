<template>
  <div class="announcement-wrp">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar.vue'
import { mapState } from 'vuex';
export default {
    components: {
        NotificationBar
    },
    computed: mapState('notificator', ['notifications'])
}
</script>

<style>
.announcement-wrp {
    position: fixed;
    font-weight: bold;
    color: #555555;
    top: 0;
    right: 6px;
    z-index: 1000;
}
</style>