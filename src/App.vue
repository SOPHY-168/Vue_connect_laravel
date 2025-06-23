<!-- <template>
  <div>

    <router-view />
  </div>
</template>

<script setup>


</script> -->


<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 p-6 bg-gray-100">
       <!-- <Dashboard/> -->
      <router-view />

    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
// import Dashboard from './views/Dashboard.vue';
</script>
