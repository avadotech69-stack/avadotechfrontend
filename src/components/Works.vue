<template>
  <section class="works-section" id="works">
    <div class="works-container">
      
      <!-- 🟣 Section Header -->
      <div class="section-header">
        <h2 class="section-title">Our <span class="highlight">Showcase</span></h2>
        <div class="title-underline"></div>
        <p class="subtitle">Explore our latest and most innovative digital solutions.</p>
      </div>

      <!-- 🟣 Works Grid -->
      <div class="works-grid" v-if="works.length > 0">
        <a 
          v-for="work in works" 
          :key="work.id" 
          :href="work.link || '#'" 
          target="_blank" 
          rel="noopener noreferrer"
          class="work-card"
        >
          <!-- Image Box -->
          <div class="image-box">
            <img :src="work.image_url" :alt="work.name" />
            <div class="image-overlay">
              <span class="view-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          
          <!-- Content Box -->
          <div class="content-box">
            <h3 class="work-title">{{ work.name }}</h3>
            <p class="work-desc">{{ work.description }}</p>
          </div>
        </a>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p v-if="loading">Loading showcase...</p>
        <p v-else>No works added yet.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://avadotechbackend.onrender.com/api";

const works = ref([]);
const loading = ref(true);

const loadWorks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/works`);
    // Limit to 6 items to fit the "max 2 rows of 3" requirement perfectly
    works.value = res.data.slice(0, 6);
  } catch (err) {
    console.error("Error loading works:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadWorks);
</script>

<style scoped>
.works-section {
  padding: 100px 10%;
  background-color: #060617;
  color: #ffffff;
}

.works-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* 🟣 Header Styles */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  line-height: 1.2;
}

.highlight {
  color: #a45cff;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  margin: 15px auto 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(164, 92, 255, 0.4);
}

.subtitle {
  color: #d6d6ff;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* 🟣 Grid Styles */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

/* 🟣 Card Styles (Glassmorphism & Neon) */
.work-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.work-card:hover {
  transform: translateY(-12px);
  border-color: rgba(164, 92, 255, 0.4);
  box-shadow: 0 20px 40px rgba(122, 63, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
}

/* Image Area */
.image-box {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.work-card:hover .image-box img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 6, 23, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.work-card:hover .image-overlay {
  opacity: 1;
}

.view-btn {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #7a3fff, #a45cff);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transform: scale(0.5);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 20px rgba(164, 92, 255, 0.6);
}

.work-card:hover .view-btn {
  transform: scale(1);
}

/* Content Area */
.content-box {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.work-title {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px 0;
  transition: color 0.3s ease;
}

.work-card:hover .work-title {
  color: #a45cff;
}

.work-desc {
  font-size: 15px;
  color: #d6d6ff;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: rgba(255, 255, 255, 0.4);
}

/* 🟣 Responsive Design */
@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .works-section {
    padding: 60px 5%;
  }
  
  .section-title {
    font-size: 36px;
  }
  
  .works-grid {
    grid-template-columns: 1fr;
  }
  
  .image-box {
    height: 200px;
  }
}
</style>
