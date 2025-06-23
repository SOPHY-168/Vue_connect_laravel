<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const books = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)

const newBook = ref({
  title: '',
  category_id: '',
  author_id: ''
})

const editingBook = ref(null)

onMounted(async () => {
  await fetchBooks()
})

async function fetchBooks() {
  try {
    const response = await api.get('/books')
    books.value = Array.isArray(response.data) ? response.data : response.data.data
  } catch (error) {
    console.error('Failed to fetch books:', error)
  }
}

function openCreateModal() {
  newBook.value = { title: '', category_id: '', author_id: '' }
  showCreateModal.value = true
}

function createBook() {
  if (!newBook.value.title) {
    alert('Please enter the book title')
    return
  }

  books.value.push({
    id: Date.now(),
    ...newBook.value
  })

  showCreateModal.value = false
}

function editBook(book) {
  editingBook.value = { ...book }
  showEditModal.value = true
}

function saveEdit() {
  const index = books.value.findIndex(b => b.id === editingBook.value.id)
  if (index !== -1) {
    books.value[index] = { ...editingBook.value }
  }
  showEditModal.value = false
}

function deleteBook(id) {
  if (confirm('Are you sure you want to delete this book?')) {
    books.value = books.value.filter(b => b.id !== id)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-bold text-gray-900">Books</h2>
      <button
        @click="openCreateModal"
        class="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
      >
        + Create New Book
      </button>
    </div>

    <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category ID</th>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author ID</th>
          <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 text-gray-800">{{ book.title }}</td>
          <td class="px-6 py-4 text-gray-800">{{ book.category_id }}</td>
          <td class="px-6 py-4 text-gray-800">{{ book.author_id }}</td>
          <td class="px-6 py-4 text-center space-x-2">
            <button @click="editBook(book)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            <button @click="deleteBook(book.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>

        <tr v-if="books.length === 0">
          <td colspan="4" class="text-center py-6 text-gray-500">No books found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Create Book</h3>
        <form @submit.prevent="createBook" class="space-y-4">
          <input v-model="newBook.title" type="text" placeholder="Title" class="w-full border px-3 py-2 rounded" />
          <input v-model="newBook.category_id" type="text" placeholder="Category ID" class="w-full border px-3 py-2 rounded" />
          <input v-model="newBook.author_id" type="text" placeholder="Author ID" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="showCreateModal = false" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Edit Book</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input v-model="editingBook.title" type="text" placeholder="Title" class="w-full border px-3 py-2 rounded" />
          <input v-model="editingBook.category_id" type="text" placeholder="Category ID" class="w-full border px-3 py-2 rounded" />
          <input v-model="editingBook.author_id" type="text" placeholder="Author ID" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="showEditModal = false" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
