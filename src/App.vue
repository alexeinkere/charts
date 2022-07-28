<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Popup></Popup>
    <GAuth></GAuth>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Popup from './components/Popup'
import Footer from './components/Footer'
import GAuth from './components/GAuth'

export default {
  name: 'App',
  components: {
    Header,
    Popup,
    GAuth,
    Footer
  }
}
</script>