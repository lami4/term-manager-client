<template>
    <nav class="navbar">
        <div class="navbar__menu">
                <a href="#" class="navbar__menu-item">Users</a>
                <a href="#" class="navbar__menu-item navbar__menu-item--active">Terms</a>
                <a href="#" class="navbar__menu-item">Suggestions</a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar"
}
</script>

<style lang="scss">
$item-padding: 10px 10px;
$border-bottom-height: 3px;
.navbar {
    background-color: #f8f8f8;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__menu {
        display: flex;
    }
    &__menu-item {
        padding: $item-padding;
        display: block;
        text-decoration: none;
        color: #343a40;
        &:hover {
            background-color: #e0e0e0;
        }
        &--active {
            border-bottom: solid #6f8faf $border-bottom-height;
        }
    }
    &__user-details {

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
}
</style>