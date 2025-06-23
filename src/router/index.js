import { createRouter, createWebHistory } from "vue-router";
import AuthorView from "@/views/AuthorView.vue";
import CategoryView from "@/views/CategoryView.vue";
import BookView from "@/views/BookView.vue";
import MemberView from "@/views/MemberView.vue";
import BorrowingView from "@/views/BorrowingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "authors",
      component: AuthorView,
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/books",
      name: "books",
      component: BookView,
    },
    {
      path: "/members",
      name: "members",
      component: MemberView,
    },
    {
      path: "/borrowing",
      name: "borrowing",
      component: BorrowingView,
    },
  ],
});

export default router;
