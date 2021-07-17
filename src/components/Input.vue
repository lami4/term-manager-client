<template>
    <label class="inp">
        <input type="text" :id="input.htmlId" placeholder=" " v-model="input.value">
        <span class="label">{{ input.label }}</span>
        <span class="focus-bg"></span>
    </label>
</template>

<script>
export default {
    props: {
        input: Object
    }
}
</script>

<style>

</style>