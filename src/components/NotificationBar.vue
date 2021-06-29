<template>
  <div class="announcement" :class="notification.type" ref="self">
      <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
    ...mapActions('notificator', ['delete'])
    },
    mounted() {
        setTimeout(() => {
            this.delete(this.notification);
        }, 5000);
        this.$refs.self.animate({opacity: '0'}, 5000);
    }
}
</script>

<style>
.announcement {
    text-align: center;
    width: 250px;
    background-color: #ffffff;
    padding: 10px 10px;
    margin: 5px 0;
    border-radius: 10px;
    color: black;
}

.announcement-wrp .error {
  background-color: #ff6961;
}

.announcement-wrp .success {
  background-color: white;
}
</style>