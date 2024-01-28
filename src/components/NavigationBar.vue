<template>
    <nav class="navbar">
        <div class="navbar__menu">
            <router-link v-for="item in availableMenuItems" :to="item.link" class="navbar__menu-item">{{ item.label }}</router-link>
        </div>
        <div class="navbar__user-details">
            <BaseButton
                class="base-button base-button--xs base-button--bgc-dark-blue navbar__base-button"
                @click="onButtonClick()"
                :label="isSignedIn ? 'Sign out' : 'Sign in'"/>
        </div>
    </nav>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import {mapActions, mapState} from "vuex";
import SystemPrivileges from "../views/UserManager/domain/SystemPrivileges";
export default {
    name: "NavigationBar",
    data() {
        return {
            menuItems: [
                {
                    label: "Users",
                    link: '/users',
                    requiredPrivilege: SystemPrivileges.USER_MANAGER
                },
                {
                    label: "Terms",
                    link: '/terms',
                    requiredPrivilege: null
                },
                {
                    label: "Suggestions",
                    link: '/suggestions',
                    requiredPrivilege: SystemPrivileges.SUGGESTION_MANAGER
                },
                {
                    label: "Term grid settings",
                    link: '/term-grid-settings',
                    requiredPrivilege: SystemPrivileges.TERM_GRID_MANAGER
                },
            ],
        }
    },
    computed: {
        ...mapState('Session', {
            isSignedIn: 'isSignedIn',
            userPrivileges: 'userPrivileges'
        }),
        availableMenuItems() {
            return this.menuItems.filter(tab => tab.requiredPrivilege === null || this.userPrivileges.includes(tab.requiredPrivilege));
        }
    },
    methods: {
        ...mapActions('Session', {
            setShowSignInDialog: 'setShowSignInDialog',
        }),
        onButtonClick() {
            if (this.isSignedIn) {
                this.signOut();
            } else {
                this.setShowSignInDialog(true); 
            }
        },
        signOut() {
            AuthenticationService.signOut().finally(() => {
                this.$router.push({path: '/terms'}).catch(() => console.log("Already redirected"))
            });
        }
    }
}
</script>

<style lang="scss">
$item-padding: 10px 10px;
$border-bottom-height: 3px;
.navbar {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 15px 0;
    &__menu {
        display: flex;
    }
    &__menu-item {
        padding: $item-padding;
        display: block;
        text-decoration: none;
        color: #343a40;
        transition: 0.4s;
        &:hover {
            background-color: #e0e0e0;
        }
        &--active {
            border-bottom: solid #6f8faf $border-bottom-height;
        }
    }
    &__user-details {
        padding: 0 10px;
    }
    &__menu-btn {
        cursor: pointer;
        border: none;
        outline: none;
        padding: $item-padding;
        display: block;
        font-family: inherit;
        border-bottom: solid transparent $border-bottom-height;
        background-color: inherit;
        &:hover {
            background-color: #e0e0e0;
        }
    }
    &__base-button {
        border-radius: 3px;
        color: white;
    }
}
</style>