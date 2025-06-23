<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const members = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/members') // Ensure /api/members exists
    members.value = Array.isArray(response.data) ? response.data : response.data.data
    console.log(members.value)
  } catch (error) {
    console.error('Failed to fetch members:', error)
  }
})
</script>

<template>
  <ul>
    <li v-for="member in members" :key="member.id">
      {{ member.name }} - {{ member.age }} - {{ member.email }} - {{ member.address }}
    </li>
  </ul>
</template>
