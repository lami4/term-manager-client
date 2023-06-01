<template>
<div id="about-wrp">
  <h1>Welcome to Term Manager!</h1>
  <p>Here you can create and manage your own term base.</p>
     <h1>That's the green circle below</h1>
  <BaseGrid>
    <template v-slot:columnHeader="slotProps">{{ slotProps.column.columnName }}</template>
    <template v-slot:cellContent="slotProps">{{ slotProps.value }}</template>
  </BaseGrid>
  <button @click="showDialogBox = true">Show dialog box</button>
  <BaseDialog :show="showDialogBox" title="Test dialog box" submit-button-label="Submit" cancel-button-label="Cancel" @close="showDialogBox = false">
    <template v-slot:body>
      <ValidationProvider rules="secret" v-slot="{ errors }" slim>
        <input v-model="email" type="text">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </template>
  </BaseDialog>

</div>
</template>

<script>
import BaseGrid from "./BaseGrid";
import BaseDialog from "./BaseDialog";
export default {
  name: 'app',
  components: {
    BaseGrid,
    BaseDialog

 },
  data() {
    return {
      showDialogBox: false,
      test: "1",
       email: null
    }
  },
  mounted() {
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>