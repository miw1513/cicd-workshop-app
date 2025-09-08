<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h1>CI/CD Workshop App</h1>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/users" class="nav-link">Users</router-link>
        <router-link to="/metrics" class="nav-link">Metrics</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="footer">
      <p>&copy; 2024 CI/CD Workshop - Golang + Vue.js</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHealthStore } from '../stores/health'

const healthStore = useHealthStore()

onMounted(() => {
  healthStore.checkHealth()
})
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #34495e;
}

.main-content {
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>