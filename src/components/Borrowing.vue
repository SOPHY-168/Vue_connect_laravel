<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const borrowings = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/borrowing')
    borrowings.value = Array.isArray(response.data) ? response.data : response.data.data
    console.log(borrowings.value);
    
  } catch (error) {
    console.error('Failed to fetch borrowings:', error)
  }
})
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Borrowing Records</h2>
    <ul v-if="borrowings.length">
      <li v-for="borrowing in borrowings" :key="borrowing.id" class="mb-2">
        {{ borrowing.book_id }} - {{ borrowing.member_id }} - {{ borrowing.borrowed_at }} - {{ borrowing.returned_at }}
      </li>
    </ul>
  </div>
</template>
