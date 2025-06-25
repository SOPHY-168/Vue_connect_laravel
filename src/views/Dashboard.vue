<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">📊 Dashboard Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <div
        v-for="(item, index) in dashboardItems"
        :key="index"
        class="flex items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
      >
        <div
          class="w-12 h-12 flex items-center justify-center rounded-md text-white text-lg font-bold"
          :class="item.bg"
        >
          {{ item.icon }}
        </div>
        <div class="ml-3">
          <h4 class="text-xs text-gray-500">{{ item.label }}</h4>
          <p class="text-base font-semibold text-gray-800 mt-1">{{ item.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { index as fetchBooks } from '@/api/book'
import { index as fetchMembers } from '@/api/member'
import { index as fetchAuthors } from '@/api/author'
import { index as fetchCategory } from '@/api/category'
import { index as fetchBorrowing } from '@/api/borrowing'
const books = ref([])
const members = ref([])
const authors = ref([])
const category = ref([])
const borrowing = ref([])

onMounted(async () => {
  try {
    // book
    const booksRes = await fetchBooks()
    books.value = Array.isArray(booksRes.data) ? booksRes.data : booksRes.data.data
    // member
    const membersRes = await fetchMembers()
    members.value = Array.isArray(membersRes.data) ? membersRes.data : membersRes.data.data
    // category
    const categoryRes = await fetchCategory()
    category.value = Array.isArray(categoryRes.data) ? categoryRes.data : categoryRes.data.data
    // authors
    const authorsRes = await fetchAuthors()
    authors.value = Array.isArray(authorsRes.data) ? authorsRes.data : authorsRes.data.data
    // borrowing
    const borrowRes = await fetchBorrowing()
    borrowing.value = Array.isArray(borrowRes.data) ? borrowRes.data : borrowRes.data.data
  } catch (error) {
    console.error('Failed to fetch books for dashboard:', error)
  }
})

const dashboardItems = ref([
  { label: 'Books', count: 0, icon: '📘', bg: 'bg-red-400' },
  { label: 'Members', count: 0, icon: '👥', bg: 'bg-green-500' },
  { label: 'Categories', count: 0, icon: '📂', bg: 'bg-yellow-400' },
  { label: 'Authors', count: 0, icon: '✍️', bg: 'bg-blue-500' },
  { label: 'Borrowings', count: 0, icon: '📄', bg: 'bg-indigo-500' },
])

// Update book count when books are fetched
watch([books, members, authors,category,borrowing], () => {
  dashboardItems.value[0].count = books.value.length
  dashboardItems.value[1].count = members.value.length // members
  dashboardItems.value[2].count = category.value.length // category
  dashboardItems.value[3].count = authors.value.length // authors
  dashboardItems.value[4].count = borrowing.value.length // borrowing
})
</script>
