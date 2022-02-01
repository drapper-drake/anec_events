<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import UpButton from '@/components/UpButton.vue'

</script>


<template>
  <div class="w-full flex flex-col min-h-screen bg-light pt-40">
    <AppHeader />
    <router-view></router-view>
    <UpButton />
    <AppFooter />
  </div>
</template>

<style>
</style>
