<template>
  <div 
    class="banner-slider" 
    @mouseenter="pause" 
    @mouseleave="resume"
  >
    <div class="banner-wrapper">
      <transition name="fade" mode="out-in">
        <img
          v-if="banners.length"
          :key="current"
          :src="banners[current]?.image_url"
          class="banner-img"
          alt="Banner"
        />
      </transition>
    </div>

    <!-- Navigation Dots -->
    <div class="dots" v-if="banners.length > 1">
      <div
        v-for="(b, i) in banners"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="current = i"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://avadotechbackend.onrender.com/api";

const banners = ref([]);
const current = ref(0);
let interval = null;

// ⭐ FIXED — D1 JSON format handling
const loadBanners = async () => {
  try {
    const res = await axios.get(`${API_BASE}/banners`);

    console.log("Slider banner response:", res.data);

    // FIX: res.data.banners instead of res.data
    banners.value = res.data?.banners || [];

  } catch (err) {
    console.error("Banner load error:", err);
  }
};

// Auto Slide
const startSlide = () => {
  if (!banners.value.length) return;

  interval = setInterval(() => {
    current.value =
      current.value + 1 < banners.value.length ? current.value + 1 : 0;
  }, 3500);
};

const pause = () => clearInterval(interval);
const resume = () => startSlide();

onMounted(async () => {
  await loadBanners();
  startSlide();
});
</script>

<style scoped>
.banner-slider {
  width: 100%;
  height: 260px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 20px;
}

.banner-wrapper {
  width: 100%;
  height: 100%;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Dots */
.dots {
  position: absolute;
  bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 9px;
  height: 9px;
  background: #ffffff7a;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.dot.active {
  background: #fff;
  width: 11px;
  height: 11px;
}

/* Responsive */
@media (min-width: 768px) {
  .banner-slider {
    height: 380px;
  }
}

@media (min-width: 1024px) {
  .banner-slider {
    height: 480px;
  }
}
</style>
