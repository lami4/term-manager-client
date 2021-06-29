<template>
<div class="dialogbox-background" :id="htmlId">
  <div class="dialogbox-container">
    <div class="dialogbox-header">
        <span class="title">{{ title }}</span>
        <span class="close" @click="close">&times;</span>
    </div>
    <div class="dialogbox-body">
        <slot name="dialogbox-body"></slot>
    </div>
    <div class="dialogbox-footer">
        <slot name="dialogbox-footer"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        htmlId: String
    },
    data() {
        return {
        }
    },
    methods: {
       show() {
           document.querySelector(`#${this.htmlId}`).style.display = "block";
       },
       close() {
           document.querySelector(`#${this.htmlId}`).style.display = "none";
       },
       emptyTextInputs() {
         document.querySelectorAll("input[type='text']").forEach(el => {
           el.value = "";
         });
       }
    },
    mounted() {
      document.querySelector(`#${this.htmlId}`).addEventListener('click', event => {
        if(event.target == document.querySelector(`#${this.htmlId}`)) {
          this.close();
        }
      });
    }
}
</script>

<style>
.dialogbox-background {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4);
}

.dialogbox-container {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  border-radius: 10px;
  max-height: 800px;
  overflow: auto;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  line-height: 16px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.title {
    font-weight: bold;
}

.dialogbox-body {
    margin-top: 20px;
}

/* Input text style */
.dialogbox-body * {
  box-sizing: border-box;
}

.dialogbox-body .inp {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  border-radius: 3px;
  overflow: hidden;
}

.dialogbox-body .inp .label {
  position: absolute;
  top: -5px;
  left: 12px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  transform-origin: 0 0;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
  pointer-events: none;
}

.dialogbox-body .inp .focus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
}

.dialogbox-body .inp input {
  -webkit-appearance: none;
  -moz-appearance: none;
       appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 16px 12px 5px 12px;
  height: 36px;
  font-size: 12px;
  font-weight: 400;
  background: rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  color: #000;
  transition: all 0.15s ease;
  margin-bottom: 20px;
}

.dialogbox-body .inp:last-child input {
    margin-bottom: 0px;
}

.dialogbox-body .inp input:hover {
  background: rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5);
}

.dialogbox-body .inp input:not(:-moz-placeholder-shown) + .label {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -9px, 0) scale(0.85);
}

.dialogbox-body .inp input:not(:-ms-input-placeholder) + .label {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -9px, 0) scale(0.85);
}

.dialogbox-body .inp input:not(:placeholder-shown) + .label {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -9px, 0) scale(0.85);
}

.dialogbox-body .inp input:focus {
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  box-shadow: inset 0 -2px 0 #0077FF;
}

.dialogbox-body .inp input:focus + .label {
  color: #0077FF;
  transform: translate3d(0, -9px, 0) scale(0.85);
}

.dialogbox-body .inp input:focus + .label + .focus-bg {
  transform: scaleX(1);
  transition: all 0.1s ease;
}

.dialogbox-footer {
    margin-top: 20px;
}

.btn {
  background-color: #b1d4e0; /* Green */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-family: inherit;
  outline: none;
  margin-right: 10px;
}

</style>