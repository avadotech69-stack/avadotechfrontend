<template>
  <div class="admin-wrapper">

    <!-- 📌 Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="brand">Avado Admin</div>

      <nav class="menu">
        <router-link to="/admin" class="menu-item">Dashboard</router-link>
        <router-link to="/admin/banners" class="menu-item">Banners</router-link>
      </nav>
    </aside>

    <!-- 📌 MAIN AREA -->
    <div class="main">

      <!-- 🔹 Topbar -->
      <header class="topbar">
        <button class="toggle-btn" @click="sidebarOpen = !sidebarOpen">☰</button>
        <h2 class="page-title">{{ title }}</h2>
      </header>

      <!-- 🔹 Child Pages -->
      <div class="page-content">
        <router-view />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const sidebarOpen = ref(false);
const route = useRoute();

const title = computed(() => {
  const map = {
    "/admin": "Dashboard",
    "/admin/banners": "Banner Manager",
  };
  return map[route.path] || "Admin Panel";
});
</script>

<style scoped>
/* ===== MAIN WRAPPER ===== */
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background: #0a0a16;
  color: #fff;
  font-family: system-ui;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 240px;
  background: #111122;
  border-right: 1px solid #222;
  padding: 1.2rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: 0.3s ease;
  z-index: 20;
}

.brand {
  font-size: 1.4rem;
  font-weight: 700;
  color: #a78bfa;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.menu-item {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: #c8c8d8;
  text-decoration: none;
  font-size: 0.95rem;
  background: #141428;
  border: 1px solid transparent;
  transition: 0.2s;
}

.menu-item:hover {
  background: #4a00e0;
  color: #fff;
}

.router-link-active {
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
  color: #fff !important;
  border-color: #4a00e0;
}

/* ===== MAIN CONTENT ===== */
.main {
  margin-left: 240px;
  flex: 1;
}

/* ===== TOPBAR ===== */
.topbar {
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: #fff;
  box-shadow: 0 3px 10px rgba(0,0,0,0.4);
}

.page-title {
  font-size: 1.35rem;
  font-weight: 600;
}

.toggle-btn {
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
}

/* ===== MAIN PAGE CONTENT ===== */
.page-content {
  padding: 1.5rem 1.7rem;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 850px) {
  .sidebar {
    left: -260px;
  }
  .sidebar.open {
    left: 0;
  }
  .main {
    margin-left: 0;
  }
  .toggle-btn {
    display: block;
  }
}
</style>
