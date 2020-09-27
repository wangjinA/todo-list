<template>
  <div id="app">
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
    window.addEventListener('keyup', e=>{
      if(e.key === 'A'){
        this.show = true
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 100vw;
  min-height: 100vh;
  color: rgb(64, 64, 64);
}
</style>
