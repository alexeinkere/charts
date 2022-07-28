<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <footer class="bg-white absolute bottom-0 w-full">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" target="_blank" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <p v-html="item.icon"></p>
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">&copy; 2022 Quere Alexandre. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
    import Vue from 'vue';

    Vue.component({
        name: "AppFooter"
    })
    
    const navigation = [
        {
            name: 'Linkedin',
            href: 'https://www.linkedin.com/in/alexandre-quere/',
            icon: '<i class="fa-brands fa-linkedin-in"></i>'
        },
        {
            name: 'GitHub',
            href: 'https://github.com/alexeinkere',
            icon: '<i class="fa-brands fa-github"></i>'
        }
    ]
</script>