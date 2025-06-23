<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const categories = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/category')
    categories.value = Array.isArray(response.data) ? response.data : response.data.data
    console.log(categories.value);
    
  } catch (error) {
    console.error('Failed to fetch category:', error)
  }
})
</script>

<template>
<ul>
  <li v-for=" category in categories" :key="category.id">
    {{ category.category_name }}
  </li>
</ul>
</template>
