<template>
  <div class="w-64 bg-blue-800 text-white min-h-screen">
    <div class="text-2xl font-bold p-4 border-b border-blue-700">
      📚 Library System
    </div>
    <nav class="flex flex-col p-4 space-y-2">
      <RouterLink to="/" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Dashboard</RouterLink>
      <RouterLink to="/members" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Members</RouterLink>
      <RouterLink to="/books" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Books</RouterLink>
      <RouterLink to="/category" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Category</RouterLink>
      <RouterLink to="/authors" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Authors</RouterLink>
      <RouterLink to="/borrowing" class="hover:bg-blue-700 p-2 rounded" active-class="bg-blue-900">Borrowing</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
