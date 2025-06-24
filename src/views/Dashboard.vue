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

const dashboardItems = [
  { label: 'Books', count: 120, icon: '📘', bg: 'bg-red-400' },
  { label: 'Members', count: 80, icon: '👥', bg: 'bg-green-500' },
  { label: 'Categories', count: 10, icon: '📂', bg: 'bg-yellow-400' },
  { label: 'Authors', count: 25, icon: '✍️', bg: 'bg-blue-500' },
  { label: 'Borrowings', count: 45, icon: '📄', bg: 'bg-indigo-500' },
];
</script>
