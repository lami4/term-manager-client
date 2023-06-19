<template>
  <div class="notification-container">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex';
export default {
  name: "NotificationContainer",
  components: {
      NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style lang="scss">
.notification-container {
    position: fixed;
    color: #343a40;
    top: 0;
    right: 6px;
    z-index: 1000;

    &__item {
        text-align: center;
        width: 250px;
        padding: 5px 5px;
        margin: 5px 0;
        border-radius: 3px;
        &--error {
            background-color: #ff9d9d;
        }
        &--success {
            background-color: #c0e5c0;
        }
    }
}
</style>