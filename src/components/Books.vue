```vue
<script setup>
import { ref, onMounted, watch } from 'vue';
import { index } from '@/api/book';
const books = ref([]);
const error = ref(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);

const newBook = ref({
  title: '',
  category_id: '',
  author_id: '',
});

const editingBook = ref(null);

// Load books from localStorage or API on mount
onMounted(fetchBooks);

async function fetchBooks() {
  try {
    const response = await index();
    books.value = Array.isArray(response.data) ? response.data : response.data.data;
  } catch (err) {
    error.value = 'Failed to fetch Books'
    console.error('Failed to fetch books:', err);
  }
}

function openCreateModal() {
  newBook.value = { title: '', category_id: '', author_id: '' };
  showCreateModal.value = true;
}

async function createBook() {
  if (!newBook.value.title || !newBook.value.category_id || !newBook.value.author_id) {
    alert('All fields are required.');
    return;
  }

  try {
    const response = await api.post('/books', newBook.value);
    books.value.push(response.data);
    showCreateModal.value = false;
  } catch (error) {
    console.error('Failed to create book:', error);
    alert('Failed to create book.');
  }
}

function editBook(book) {
  editingBook.value = { ...book };
  showEditModal.value = true;
}

async function saveEdit() {
  if (!editingBook.value.title || !editingBook.value.category_id || !editingBook.value.author_id) {
    alert('All fields are required.');
    return;
  }

  try {
    const response = await api.put(`/books/${editingBook.value.id}`, editingBook.value);
    const index = books.value.findIndex((b) => b.id === editingBook.value.id);
    if (index !== -1) {
      books.value[index] = response.data;
    }
    showEditModal.value = false;
  } catch (error) {
    console.error('Failed to update book:', error);
    alert('Failed to update book.');
  }
}

async function deleteBook(id) {
  if (!confirm('Are you sure you want to delete this book?')) return;

  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter((b) => b.id !== id);
  } catch (error) {
    console.error('Failed to delete book:', error);
    alert('Failed to delete book.');
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
            <button
              @click="editBook(book)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              @click="deleteBook(book.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="books.length === 0">
          <td colspan="4" class="text-center py-6 text-gray-500">No books found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Create Book</h3>
        <form @submit.prevent="createBook" class="space-y-4">
          <input
            v-model="newBook.title"
            type="text"
            placeholder="Title"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <input
            v-model="newBook.category_id"
            type="number"
            placeholder="Category ID"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <input
            v-model="newBook.author_id"
            type="number"
            placeholder="Author ID"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Edit Book</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input
            v-model="editingBook.title"
            type="text"
            placeholder="Title"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <input
            v-model="editingBook.category_id"
            type="number"
            placeholder="Category ID"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <input
            v-model="editingBook.author_id"
            type="number"
            placeholder="Author ID"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
```