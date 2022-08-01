<template>
  <div v-if="showPopup">
    <div v-on:click="togglePopup()" class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 cursor-pointer z-10"></div>

    <div class="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-20">
      <div v-on:click="togglePopup()" class="absolute top-4 right-4">
        <i  class="text-2xl cursor-pointer fa-solid fa-xmark"></i>
      </div>
      
      <FormData v-if="formSelected == 'FormData'"></FormData>
      <FormSignin v-if="formSelected == 'FormSignin'"></FormSignin>
      <FormSignup v-if="formSelected == 'FormSignup'"></FormSignup>
    </div>
  </div>
</template>

<script>
  import FormData from './Forms/FormData';
	import FormSignin from './Forms/FormSignin';
	import FormSignup from './Forms/FormSignup';

	export default {
		name: "AppPopup",
    components: {
      FormData,
      FormSignin,
      FormSignup
    },
		data() {
			return {
        date: new Date,
        commande: 0,
        km: 0,
        money: 0,
        comment: "",
        showPopup: false,
        formSelected: ""
			}
		},
    created() {
      this.$root.$refs.AppPopup = this
    },
    methods: {
      togglePopup: function(form) {
        this.showPopup = !this.showPopup
        if(this.showPopup) {
          this.formSelected = form
        }
      }
    }
	}
</script>