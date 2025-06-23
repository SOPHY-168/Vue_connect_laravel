<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const members = ref([])

const showCreateModal = ref(false)
const showEditModal = ref(false)

const newMember = ref({
  name: '',
  age: '',
  email: '',
  address: ''
})

const editingMember = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('/members')
    members.value = Array.isArray(response.data) ? response.data : response.data.data
  } catch (error) {
    console.error('Failed to fetch members:', error)
  }
})

function openCreateModal() {
  newMember.value = { name: '', age: '', email: '', address: '' }
  showCreateModal.value = true
}

function createMember() {
  if (!newMember.value.name || !newMember.value.email) {
    alert('Name and Email are required.')
    return
  }

  members.value.push({
    id: Date.now(),
    ...newMember.value
  })

  showCreateModal.value = false
}

function editMember(member) {
  editingMember.value = { ...member }
  showEditModal.value = true
}

function saveEdit() {
  const index = members.value.findIndex(m => m.id === editingMember.value.id)
  if (index !== -1) {
    members.value[index] = { ...editingMember.value }
  }
  showEditModal.value = false
}

function deleteMember(memberId) {
  if (confirm('Are you sure you want to delete this member?')) {
    members.value = members.value.filter(m => m.id !== memberId)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-bold text-gray-900">Members</h2>
      <button
        @click="openCreateModal"
        class="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
      >
        + Create New Member
      </button>
    </div>

    <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
          <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in members"
          :key="member.id"
          class="border-b border-gray-200 hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-gray-800">{{ member.name }}</td>
          <td class="px-6 py-4 text-gray-800">{{ member.age }}</td>
          <td class="px-6 py-4 text-gray-800">{{ member.email }}</td>
          <td class="px-6 py-4 text-gray-800">{{ member.address }}</td>
          <td class="px-6 py-4 text-center space-x-2">
            <button
              @click="editMember(member)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              @click="deleteMember(member.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="members.length === 0">
          <td colspan="5" class="text-center py-8 text-gray-500">No members found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Create Member Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Create New Member</h3>
        <form @submit.prevent="createMember" class="space-y-4">
          <input v-model="newMember.name" placeholder="Name" class="w-full border px-3 py-2 rounded" />
          <input v-model="newMember.age" placeholder="Age" type="number" class="w-full border px-3 py-2 rounded" />
          <input v-model="newMember.email" placeholder="Email" class="w-full border px-3 py-2 rounded" />
          <input v-model="newMember.address" placeholder="Address" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="showCreateModal = false" class="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
        <button @click="showCreateModal = false" class="absolute top-3 right-3 text-gray-500 text-xl">
          &times;
        </button>
      </div>
    </div>

    <!-- Edit Member Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h3 class="text-xl font-semibold mb-4">Edit Member</h3>
        <form @submit.prevent="saveEdit" class="space-y-4">
          <input v-model="editingMember.name" placeholder="Name" class="w-full border px-3 py-2 rounded" />
          <input v-model="editingMember.age" placeholder="Age" type="number" class="w-full border px-3 py-2 rounded" />
          <input v-model="editingMember.email" placeholder="Email" class="w-full border px-3 py-2 rounded" />
          <input v-model="editingMember.address" placeholder="Address" class="w-full border px-3 py-2 rounded" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="showEditModal = false" class="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </form>
        <button @click="showEditModal = false" class="absolute top-3 right-3 text-gray-500 text-xl">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>
