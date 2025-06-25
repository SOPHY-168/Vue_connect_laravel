<script setup>
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { index , store, update, destroy  } from '@/api/author';

const authors = ref([]);
const error = ref(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);

const newAuthor = ref({
  FirstName: '',
  LastName: '',
  Nationality: '',
});

const editingAuthor = ref(null);

// Load authors from localStorage or API on mount
onMounted(fetchAuthors);

async function fetchAuthors() {
  try {
    const response = await index();
    authors.value = Array.isArray(response.data) ? response.data : response.data.data;
  } catch (err) {
    error.value = 'Failed to fetch authors';
    console.error(err);
  }
}

function openCreateModal() {
  newAuthor.value = { FirstName: '', LastName: '', Nationality: '' };
  showCreateModal.value = true;
}

async function createAuthor() {
  if (!newAuthor.value.FirstName || !newAuthor.value.LastName) {
    alert('Please fill in all required fields.');
    return;
  }
  try {
    const response = await store(newAuthor.value);
    authors.value.push(response.data);
    showCreateModal.value = false;
  } catch (err) {
    alert('Failed to create author.');
    console.error(err);
  }
}

function editAuthor(author) {
  editingAuthor.value = { ...author };
  showEditModal.value = true;
}

async function saveEdit() {
  if (!editingAuthor.value.FirstName || !editingAuthor.value.LastName) {
    alert('Please fill in all required fields.');
    return;
  }
  try {
    const response = await update(editingAuthor.value);
    const index = authors.value.findIndex((a) => a.id === editingAuthor.value.id);
    if (index !== -1) {
      authors.value[index] = response.data;
    }
    showEditModal.value = false;
  } catch (err) {
    alert('Failed to update author.');
    console.error(err);
  }
}

async function deleteAuthor(authorId) {
  if (!confirm('Are you sure you want to delete this author?')) return;
  try {
    await destroy(authorId);
    authors.value = authors.value.filter((a) => a.id !== authorId);
  } catch (err) {
    alert('Failed to delete author.');
    console.error(err);
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-bold text-gray-900">Authors</h2>
      <button
        @click="openCreateModal"
        class="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
      >
        + Create New Author
      </button>
    </div>

    <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="text-left px-6 py-3 text-sm font-semibold text-gray-700">First Name</th>
          <th class="text-left px-6 py-3 text-sm font-semibold text-gray-700">Last Name</th>
          <th class="text-left px-6 py-3 text-sm font-semibold text-gray-700">Nationality</th>
          <th class="text-center px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="author in authors"
          :key="author.id"
          class="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td class="px-6 py-4 whitespace-nowrap text-gray-800">{{ author.FirstName }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-800">{{ author.LastName }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-800">{{ author.Nationality }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-center space-x-2">
            <button
              @click="editAuthor(author)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              @click="deleteAuthor(author.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="authors.length === 0">
          <td colspan="4" class="text-center py-8 text-gray-500">No authors found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Create New Author</h3>

        <form @submit.prevent="createAuthor" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1" for="firstNameCreate">First Name *</label>
            <input
              id="firstNameCreate"
              v-model="newAuthor.FirstName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-1" for="lastNameCreate">Last Name *</label>
            <input
              id="lastNameCreate"
              v-model="newAuthor.LastName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-1" for="nationalityCreate">Nationality</label>
            <input
              id="nationalityCreate"
              v-model="newAuthor.Nationality"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </form>

        <button
          @click="showCreateModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Edit Author</h3>

        <form @submit.prevent="saveEdit" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1" for="firstNameEdit">First Name *</label>
            <input
              id="firstNameEdit"
              v-model="editingAuthor.FirstName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-1" for="lastNameEdit">Last Name *</label>
            <input
              id="lastNameEdit"
              v-model="editingAuthor.LastName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-1" for="nationalityEdit">Nationality</label>
            <input
              id="nationalityEdit"
              v-model="editingAuthor.Nationality"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        <button
          @click="showEditModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>