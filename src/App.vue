<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Popup></Popup>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Popup from './components/Popup';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Popup,
    Footer
  }
}
</script>