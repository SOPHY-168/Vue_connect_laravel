<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios'; 

const authors = ref([]);

onMounted(async () => {
  try {
    const response = await api.get('/authors')
    // console.log('API result:', response.data)
    authors.value = Array.isArray(response.data) ? response.data : response.data.data
  } catch (error) {
    console.error('Failed to fetch authors:', error)
  }
});
</script>

<template>
  <ul>
    <li v-for="author in authors" :key="author.id"> 
    {{ author.FirstName }} - {{ author.LastName }} - {{ author.Nationality }}
    </li>
  </ul>
</template>
