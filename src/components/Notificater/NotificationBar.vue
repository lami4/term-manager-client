<template>
    <div class="notification-container__item" :class="className" ref="self">
        <p>{{ notification.message }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import NotificationType from "./domain/NotificationType";
export default {
    name: 'NotificationBar',
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    computed: {
        className() {
            let className = 'notification-container__item--';
            if (this.notification.type === NotificationType.SUCCESS) {
                return className.concat(NotificationType.SUCCESS);
            } else {
                return className.concat(NotificationType.ERROR);
            }
        }
    },
    methods: {
        ...mapActions('notification', ['delete'])
    },
    mounted() {
        setTimeout(() => {
            this.delete(this.notification);
        }, 4900);
        this.$refs.self.animate({opacity: '0'}, 5000);
    }
}
</script>

<style>
</style>