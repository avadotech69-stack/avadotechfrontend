<template>
  <div class="hero-banner">

    <!-- LEFT STATIC CONTENT -->
    <div class="left">
      <div class="badge">
     
        <span>600+ Satisfied Customers</span>
      </div>

      <h1 class="title">
        We Craft Digital <br />
        Experiences for <span class="highlight">Local Businesses</span>
      </h1>

      <p class="subtitle">
        Transform your online presence with custom web design, SEO strategies,
        and seamless user experiences tailored for your business.
      </p>

      <button class="cta">Get a Free Website Audit →</button>
    </div>

    <!-- RIGHT IMAGES (LIKE AXISVERT) -->
    <div class="right">

      <!-- COLUMN 1 → UP SCROLL -->
      <div class="column">
        <div class="scroll-up">
          <div v-for="(banner, i) in column1" :key="'a-'+i" class="img-box">
            <img :src="banner.image_url" />
          </div>

          <!-- duplicate -->
          <div v-for="(banner, i) in column1" :key="'ab-'+i" class="img-box">
            <img :src="banner.image_url" />
          </div>
        </div>
      </div>

      <!-- COLUMN 2 → DOWN SCROLL -->
      <div class="column">
        <div class="scroll-down">
          <div v-for="(banner, i) in column2" :key="'b-'+i" class="img-box">
            <img :src="banner.image_url" />
          </div>

          <!-- duplicate -->
          <div v-for="(banner, i) in column2" :key="'bb-'+i" class="img-box">
            <img :src="banner.image_url" />
          </div>
        </div>
      </div>

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
const column1 = ref([]);
const column2 = ref([]);

onMounted(async () => {
  const res = await axios.get(`${API_BASE}/portfolio-banners`);
  banners.value = res.data;

  const full = [...banners.value];

  column1.value = full.filter((_, i) => i % 2 === 0);
  column2.value = full.filter((_, i) => i % 2 !== 0);
});
</script>

<style scoped>
/* ======================================
   MAIN WRAPPER — FULLSCREEN
====================================== */
.hero-banner {
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  color: #FFFFFF;
  background: #060617; /* AVADO TECH BACKGROUND */
  gap: 60px;
  padding-top: 5%;
  padding-bottom: 3%;
  padding-right: 10%;
  padding-left: 10%;
}

/* ======================================
   LEFT SECTION
====================================== */
.left {
  width: 45%;
}

.title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  color: #FFFFFF;
}

.highlight {
  color: #7A3FFF; /* AVADO Primary Purple */
}

.subtitle {
  margin-top: 18px;
  font-size: 18px;
  color: #D6D6FF; /* Light Text */
  max-width: 90%;
}

.cta {
  margin-top: 30px;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  color: #FFFFFF;

  background: linear-gradient(90deg, #7A3FFF, #A45CFF); /* Purple Gradient */
  border: none;

  box-shadow: 0 0 20px rgba(164, 92, 255, 0.4); /* Purple Glow */
  transition: 0.3s ease;
}

.cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 28px rgba(164, 92, 255, 0.6);
}

/* ======================================
   RIGHT IMAGE AREA
====================================== */
.right {
  width: 45%;
  height: 100%;
  display: flex;
  gap: 20px;
  overflow: hidden;
  position: relative;
}

/* 🔥 AVADO VERSION OF AXISVERT VIGNETTE SHADOW */
.right::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;



  /* Purple + Blue neon blend */
  mix-blend-mode: normal;
  z-index: 5;
}

/* ======================================
   COLUMNS + MASKING
====================================== */
.column {
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* Axisvert fade + AVADO dark theme */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,0,0,1) 22%,
    rgba(0,0,0,1) 78%,
    transparent 100%
  );
}

/* ======================================
   SCROLL ANIMATION
====================================== */
.scroll-up,
.scroll-down {
  display: flex;
  flex-direction: column;
  animation-duration: 40s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.scroll-up {
  animation-name: upScroll;
}
.scroll-down {
  animation-name: downScroll;
}

@keyframes upScroll {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@keyframes downScroll {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}

/* ======================================
   IMAGE BOXES — AVADO THEME STYLE
====================================== */
.img-box {
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 14px;
  flex-shrink: 0;

  /* Purple-Neon Glow + Soft Depth Shadow */
  box-shadow:
    0 0 18px rgba(122, 63, 255, 0.25),
    0 0 22px rgba(0, 122, 255, 0.15),
    0 4px 10px rgba(0,0,0,0.4);
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* ======================================
   RESPONSIVE
====================================== */
@media (max-width: 1024px) {
  .hero-banner {
    height: auto;
    flex-direction: column;
    text-align: center;
    padding: 40px 0;
  }

  .left,
  .right {
    width: 100%;
  }

  .right {
    height: 450px;
  }

  .title {
    font-size: 36px;
  }
}

@media (max-width: 760px) {
  .right {
    height: 400px;
    gap: 12px;
  }

  .column {
    height: 100%;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 15px;
  }

  .img-box {
    height: 200px;
  }
}
</style>
