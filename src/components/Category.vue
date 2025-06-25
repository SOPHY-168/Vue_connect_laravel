```vue
<script setup>
import { ref, onMounted, watch } from 'vue';
import { index, store, update, destroy } from '@/api/category';
const categories = ref([]);
const error = ref(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);

const newCategory = ref({
  category_name: '',
});

const editingCategory = ref(null);

// Load categories from localStorage or API on mount
onMounted(fetchCategories);

async function fetchCategories() {
  try {
    const response = await index();
    categories.value = Array.isArray(response.data) ? response.data : response.data.data;
  } catch (err) {
    error.value = 'Failed to fetch categories'
    console.error('Failed to fetch categories:', error);
  }
}

function openCreateModal() {
  newCategory.value = { category_name: '' };
  showCreateModal.value = true;
}

async function createCategory() {
  if (!newCategory.value.category_name) {
    alert('Please enter category name');
    return;
  }

  try {
    const response = await store(newCategory.value);
    categories.value.push(response.data);
    showCreateModal.value = false;
  } catch (error) {
    console.error('Failed to create category:', error);
    alert('Failed to create category.');
  }
}

function editCategory(category) {
  editingCategory.value = { ...category };
  showEditModal.value = true;
}

async function saveEdit() {
  if (!editingCategory.value.category_name) {
    alert('Please enter category name');
    return;
  }

  try {
    const response = await update(editingCategory.value);
    const index = categories.value.findIndex(c => c.id === editingCategory.value.id);
    if (index !== -1) {
      categories.value[index] = response.data;
    }
    showEditModal.value = false;
  } catch (error) {
    console.error('Failed to update category:', error);
    alert('Failed to update category.');
  }
}

async function deleteCategory(id) {
  if (!confirm('Are you sure you want to delete this category?')) return;

  try {
    await destroy(id);
    categories.value = categories.value.filter(c => c.id !== id);
  } catch (error) {
    console.error('Failed to delete category:', error);
    alert('Failed to delete category.');
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-900">Categories</h2>
      <button
        @click="openCreateModal"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        + Create Category
      </button>
    </div>

    <table class="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category Name</th>
          <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
          class="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td class="px-6 py-4 text-gray-800">{{ category.category_name }}</td>
          <td class="px-6 py-4 text-center space-x-2">
            <button
              @click="editCategory(category)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              @click="deleteCategory(category.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="categories.length === 0">
          <td colspan="2" class="text-center py-6 text-gray-500">No categories found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 shadow">
        <h3 class="text-lg font-semibold mb-4">Create Category</h3>
        <form @submit.prevent="createCategory" class="space-y-4">
          <input
            v-model="newCategory.category_name"
            type="text"
            placeholder="Category Name"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <div class="flex justify-end space-x-3">
            <button
              @click="showCreateModal = false"
              type="button"
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
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 shadow">
        <h3 class="text-lg font-semibold mb-4">Edit Category</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input
            v-model="editingCategory.category_name"
            type="text"
            placeholder="Category Name"
            class="w-full border px-3 py-2 rounded"
            required
          />
          <div class="flex justify-end space-x-3">
            <button
              @click="showEditModal = false"
              type="button"
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