<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const borrowings = ref([])

const showCreateModal = ref(false)
const showEditModal = ref(false)

const newBorrowing = ref({
  book_id: '',
  member_id: '',
  borrowed_at: '',
  returned_at: '',
})

const editingBorrowing = ref(null)

onMounted(fetchBorrowings)

async function fetchBorrowings() {
  try {
    const response = await api.get('/borrowing')
    borrowings.value = Array.isArray(response.data) ? response.data : response.data.data
  } catch (error) {
    console.error('Failed to fetch borrowings:', error)
  }
}

function openCreateModal() {
  newBorrowing.value = {
    book_id: '',
    member_id: '',
    borrowed_at: '',
    returned_at: '',
  }
  showCreateModal.value = true
}

function createBorrowing() {
  borrowings.value.push({
    id: Date.now(),
    ...newBorrowing.value,
  })
  showCreateModal.value = false
}

function editBorrowing(borrowing) {
  editingBorrowing.value = { ...borrowing }
  showEditModal.value = true
}

function saveEdit() {
  const index = borrowings.value.findIndex(b => b.id === editingBorrowing.value.id)
  if (index !== -1) {
    borrowings.value[index] = { ...editingBorrowing.value }
  }
  showEditModal.value = false
}

function deleteBorrowing(id) {
  if (confirm('Are you sure you want to delete this record?')) {
    borrowings.value = borrowings.value.filter(b => b.id !== id)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Borrowings</h2>
      <button
        @click="openCreateModal"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        + New Borrowing
      </button>
    </div>

    <table class="min-w-full bg-white shadow rounded-lg">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="px-4 py-2 text-left">Book ID</th>
          <th class="px-4 py-2 text-left">Member ID</th>
          <th class="px-4 py-2 text-left">Borrowed At</th>
          <th class="px-4 py-2 text-left">Returned At</th>
          <th class="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="borrowing in borrowings"
          :key="borrowing.id"
          class="border-b hover:bg-gray-50 transition"
        >
          <td class="px-4 py-2">{{ borrowing.book_id }}</td>
          <td class="px-4 py-2">{{ borrowing.member_id }}</td>
          <td class="px-4 py-2">{{ borrowing.borrowed_at }}</td>
          <td class="px-4 py-2">{{ borrowing.returned_at || 'Not Returned' }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button @click="editBorrowing(borrowing)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            <button @click="deleteBorrowing(borrowing.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
        <tr v-if="borrowings.length === 0">
          <td colspan="5" class="text-center text-gray-500 py-6">No records found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow w-96">
        <h3 class="text-lg font-semibold mb-4">New Borrowing</h3>
        <form @submit.prevent="createBorrowing" class="space-y-4">
          <input v-model="newBorrowing.book_id" placeholder="Book ID" type="number" class="w-full border px-3 py-2 rounded" required />
          <input v-model="newBorrowing.member_id" placeholder="Member ID" type="number" class="w-full border px-3 py-2 rounded" required />
          <input v-model="newBorrowing.borrowed_at" placeholder="Borrowed At (YYYY-MM-DD)" type="date" class="w-full border px-3 py-2 rounded" required />
          <input v-model="newBorrowing.returned_at" placeholder="Returned At (Optional)" type="date" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showCreateModal = false" class="border px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow w-96">
        <h3 class="text-lg font-semibold mb-4">Edit Borrowing</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input v-model="editingBorrowing.book_id" type="number" class="w-full border px-3 py-2 rounded" required />
          <input v-model="editingBorrowing.member_id" type="number" class="w-full border px-3 py-2 rounded" required />
          <input v-model="editingBorrowing.borrowed_at" type="date" class="w-full border px-3 py-2 rounded" required />
          <input v-model="editingBorrowing.returned_at" type="date" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showEditModal = false" class="border px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
