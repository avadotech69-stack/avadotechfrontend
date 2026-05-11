<template>
  <div class="page-container">

    <!-- Title -->
    <h2 class="title">Portfolio Banner Manager</h2>

    <!-- Upload Section -->
    <div class="upload-card">
      <h3>Upload New Banner</h3>

      <input type="file" @change="handleFile" class="file-input" />

      <button
        class="upload-btn"
        :disabled="loading || !file"
        @click="uploadBanner"
      >
        <span v-if="loading">Uploading...</span>
        <span v-else>Upload Banner</span>
      </button>

      <!-- Preview -->
      <div v-if="preview" class="preview-box">
        <img :src="preview" alt="Preview" />
      </div>
    </div>

    <!-- Banners List -->
    <div class="grid-title">Saved Banners</div>

    <div class="banner-grid">
      <div
        v-for="item in banners"
        :key="item.id"
        class="banner-card"
      >
        <img :src="item.image_url" alt="banner" />

        <button class="delete-btn" @click="deleteBanner(item.id)">
          ✖
        </button>
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
const file = ref(null);
const preview = ref(null);
const loading = ref(false);

const handleFile = (e) => {
  file.value = e.target.files[0];
  preview.value = URL.createObjectURL(file.value);
};

const uploadBanner = async () => {
  if (!file.value) return;
  loading.value = true;

  try {
    // Step 1 → Upload to R2
    const form = new FormData();
    form.append("image", file.value);

    const r2 = await axios.post(`${API_BASE}/upload`, form);
    const imageUrl = r2.data.url;

    // Step 2 → Save into DB
    await axios.post(`${API_BASE}/portfolio-banners/add`, {
      image_url: imageUrl,
    });

    file.value = null;
    preview.value = null;

    await loadBanners();
  } catch (e) {
    console.error("Upload error:", e);
  }

  loading.value = false;
};

const loadBanners = async () => {
  const res = await axios.get(`${API_BASE}/portfolio-banners`);
  banners.value = res.data;
};

const deleteBanner = async (id) => {
  if (!confirm("Delete this banner?")) return;

  await axios.delete(`${API_BASE}/portfolio-banners/${id}`);
  await loadBanners();
};

onMounted(() => {
  loadBanners();
});
</script>

<style scoped>
/* Page wrapper */
.page-container {
  padding: 30px;
  color: #ffffff;
  background: #060617;
  max-height: 100vh;
}

/* TITLE */
.title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 25px;
  color: #a45cff;
}

/* Upload Card */
.upload-card {
  background: #0c0c22;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 35px;
  border: 1px solid rgba(164, 92, 255, 0.2);
  box-shadow: 0 0 20px rgba(164, 92, 255, 0.2);
}

.file-input {
  margin-top: 12px;
  margin-bottom: 12px;
}

/* Upload Button */
.upload-btn {
  padding: 10px 18px;
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Image Preview */
.preview-box {
  width: 200px;
  margin-top: 15px;
}

.preview-box img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(122, 63, 255, 0.3);
}

/* Grid Title */
.grid-title {
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 700;
  color: #d6d6ff;
}

/* Banner Grid */
.banner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;

  /* NEW: limit height */
  max-height: 500px; /* তোমার ইচ্ছামতো height দিতে পারো */

  overflow-y: auto;      /* vertical scroll */
  padding-right: 8px;    /* scrollbar space fix */
}

/* scrollbar styling (optional) */
.banner-grid::-webkit-scrollbar {
  width: 6px;
}

.banner-grid::-webkit-scrollbar-thumb {
  background: #7a3fff;
  border-radius: 10px;
}

.banner-grid::-webkit-scrollbar-track {
  background: #0a0a1a;
}

.banner-card {
  background: #0a0a1a;
  padding: 10px;
  border-radius: 14px;
  position: relative;
  border: 1px solid rgba(122, 63, 255, 0.3);
  box-shadow: 0 0 15px rgba(122, 63, 255, 0.2);
  transition: 0.3s;
}

.banner-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 25px rgba(164, 92, 255, 0.4);
}

.banner-card img {
  width: 100%;
  border-radius: 10px;
}

/* Delete Button */
.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
