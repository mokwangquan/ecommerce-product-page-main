<template>
  <div id="app">
    <Header class="header-component"
      :isMobile="isMobile"/>
    <ProductDetail
      :isMobile="isMobile"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ProductDetail from './components/ProductDetail.vue'

export default {
  name: 'App',
  components: {
    Header,
    ProductDetail,
  },
  data() {
    return {
      isMobile: false,
    }
  },
  methods: {
    reEvalIsMobile() {
      const width = window.innerWidth
      this.isMobile = width <= 1425 // when header start to break
    },
  },
  mounted() {
    this.reEvalIsMobile()
    window.addEventListener("resize", this.reEvalIsMobile);
  },
  destroyed() {
    window.addEventListener("resize", this.reEvalIsMobile);
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap');
html, body {
  margin: 0;
  padding: 0;
  height: 70%;
  width: 100%;
}
#app {
  font-family: 'Kumbh Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}

// For all use
.no-highlight {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
