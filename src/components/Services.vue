<template>
  <section class="services-section" id="services">
    <div class="services-container">
      
      <!-- 🟣 Section Header -->
      <div class="section-header">
        <h2 class="section-title">Services We <span class="highlight">Provide</span></h2>
        <div class="title-underline"></div>
      </div>
      <!-- 🟣 3-Image Focused Slider -->
      <div class="slider-wrapper" :style="{ '--active': activeTab }" v-if="services.length > 0">
        <div class="slider-track">
          <div 
            v-for="(service, index) in services" 
            :key="service.id" 
            :class="['image-card', { 
              'active': index === activeTab,
              'side': index === activeTab - 1 || index === activeTab + 1
            }]"
          >
            <div class="image-area">
              <img :src="service.image_url" :alt="service.title" class="service-image" />
              <div class="overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🟣 Tab Navigation Wrapper -->
      <div class="tabs-wrapper" v-if="services.length > 0">
        <div class="tabs-list">
          <button 
            v-for="(service, index) in services" 
            :key="service.id"
            :class="['tab-item', { active: activeTab === index }]"
            @click="activeTab = index"
          >
            {{ service.title }}
          </button>
        </div>

        <!-- 🟣 Navigation Arrows -->
        <div class="nav-arrows">
          <button class="arrow-btn" @click="prevTab">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="arrow-btn" @click="nextTab">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 🟣 Loading / Empty State -->
      <div v-else class="empty-state">
        <p v-if="loading">Loading services...</p>
        <p v-else>No services found. Add them from the admin panel.</p>
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

const services = ref([]);
const activeTab = ref(0);
const loading = ref(true);

// Slider Settings
const imageWidth = 700;
const gap = 40;

const loadServices = async () => {
  try {
    const res = await axios.get(`${API_BASE}/services`);
    services.value = res.data;
  } catch (err) {
    console.error("Error loading services:", err);
  } finally {
    loading.value = false;
  }
};

const prevTab = () => {
  if (services.value.length === 0) return;
  if (activeTab.value > 0) activeTab.value--;
  else activeTab.value = services.value.length - 1;
};

const nextTab = () => {
  if (services.value.length === 0) return;
  if (activeTab.value < services.value.length - 1) activeTab.value++;
  else activeTab.value = 0;
};

onMounted(loadServices);
</script>

<style scoped>
.services-section {
  padding: 80px 0;
  background-color: #060617;
  color: #ffffff;
  overflow: hidden; /* Prevent horizontal scroll from slider */
}

.services-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* 🟣 Section Header Styles */
.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  line-height: 1.2;
}

.highlight {
  color: #a45cff; /* Theme Purple */
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  margin: 15px auto 0;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(164, 92, 255, 0.4);
}

/* 🟣 Slider Styles */
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 580px;

  --image-width: 950px;
  --gap: 40px;
}

.slider-track {
  display: flex;
  align-items: center;
  gap: var(--gap);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(calc(-0.5 * var(--image-width) - var(--active) * (var(--image-width) + var(--gap))));
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.image-card {
  flex-shrink: 0;
  width: var(--image-width);
  height: 550px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0.3;
  filter: blur(8px);
  transform: scale(0.8);
}

.image-card.active {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
  z-index: 10;
}

.image-card.side {
  opacity: 0.6;
  filter: blur(4px);
  transform: scale(0.9);
}

.image-area {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(6, 6, 23, 0.2) 100%);
  pointer-events: none;
}

/* 🟣 Tabs Wrapper */
.tabs-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15%; /* Increased side padding to move items towards center */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 10px;
  gap: 20px;
}

.tabs-list {
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs-list::-webkit-scrollbar {
  display: none;
}

.tab-item {
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.5);
  padding: 8px 22px; /* Smaller padding */
  border-radius: 100px;
  font-size: 14px; /* Smaller font size */
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.4s ease;
}

.tab-item.active {
  border-color: #ffffff;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.nav-arrows {
  display: flex;
  gap: 15px;
}

.arrow-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}

.arrow-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
  .slider-wrapper {
    --image-width: 500px;
  }
  .image-card {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 60px 0 20px;
  }
  .section-title {
    font-size: 32px;
  }
  .slider-wrapper {
    --image-width: 80vw;
  }
  .image-card {
    height: 350px;
  }
  .tabs-wrapper {
    flex-direction: column;
    padding: 20px 5%;
    gap: 15px;
  }
  .tabs-list {
    flex-wrap: wrap;
    justify-content: center;
  }
  .nav-arrows {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .image-card {
    height: 250px;
  }
  .tabs-list {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
}
</style>
