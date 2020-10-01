<template>
  <div id="app">
    <div id="app-bg"></div>
    <HelloWorld v-if="show"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    VANTA.BIRDS({
      el: "#app-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0x71c2f,
      color1: 0x1e00ff,
      speedLimit: 8.00,
      separation: 62.00,
      alignment: 38.00
    })
    window.addEventListener('keyup', e=>{
      console.log(e);
      if(e.code === 'Space'){
        clearTimeout(this.$spaceTagTimer)
        this.$spaceTag!==undefined ? this.$spaceTag++ : this.$spaceTag = 1
        console.log(this.$spaceTag);
        if(this.$spaceTag == 2){
          this.show = true
        }
        this.$spaceTagTimer = setTimeout(() => {
          this.$spaceTag = 0
        }, 300);
      }else if(e.code === 'Escape'){
        this.show = false
      } else {
        this.$spaceTag = 0
      }
    })
  }
}
</script>

<style>
#app-bg{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 100vw;
  min-height: 100vh;
  color: rgb(64, 64, 64);
}
</style>
