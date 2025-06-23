<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";

const books = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/books");
    books.value = Array.isArray(response.data)
      ? response.data
      : response.data.data;
    console.log(books.value);
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
});
</script>

<template>
  <ul>
    <li v-for="book in books" :key="book.id">
      {{ book.title }} -
      {{ book.category_id}} - 
      {{ book.author_id }}
    </li>
  </ul>
</template>
