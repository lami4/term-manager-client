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
    font-weight: bold;
    color: #555555;
    top: 0;
    right: 6px;
    z-index: 1000;

    &__item {
        text-align: center;
        width: 250px;
        background-color: #ffffff;
        padding: 10px 10px;
        margin: 5px 0;
        border-radius: 10px;
        color: black;
        &--error {
            background-color: #ff6961;
        }
        &--success {
            background-color: #fff;
        }
    }
}
</style>