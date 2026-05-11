<template>
  <div class="page-container">
    <h2 class="title">Service Tab Manager</h2>

    <!-- Add Service Form -->
    <div class="upload-card">
      <h3>Add New Service Tab</h3>
      
      <div class="input-group">
        <label>Tab Title</label>
        <input type="text" v-model="newService.title" placeholder="e.g. AI Assistant" class="text-input" />
      </div>

      <div class="input-group">
        <label>Service Image</label>
        <input type="file" @change="handleFile" class="file-input" />
      </div>

      <button
        class="upload-btn"
        :disabled="loading || !file || !newService.title"
        @click="addService"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Add Service</span>
      </button>

      <!-- Preview -->
      <div v-if="preview" class="preview-box">
        <p>Image Preview:</p>
        <img :src="preview" alt="Preview" />
      </div>
    </div>

    <!-- Services List -->
    <div class="grid-title">Current Service Tabs</div>
    <div class="service-grid">
      <div v-for="item in services" :key="item.id" class="service-card">
        <img :src="item.image_url" alt="service" />
        <div class="card-info">
          <h4>{{ item.title }}</h4>
          <button class="delete-btn" @click="deleteService(item.id)">Delete</button>
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

const services = ref([]);
const newService = ref({ title: "" });
const file = ref(null);
const preview = ref(null);
const loading = ref(false);

const handleFile = (e) => {
  file.value = e.target.files[0];
  if (file.value) {
    preview.value = URL.createObjectURL(file.value);
  }
};

const addService = async () => {
  if (!file.value || !newService.value.title) return;
  loading.value = true;

  try {
    // 1. Upload image to R2
    const form = new FormData();
    form.append("image", file.value);
    const uploadRes = await axios.post(`${API_BASE}/upload`, form);
    const imageUrl = uploadRes.data.url;

    // 2. Save service to DB
    await axios.post(`${API_BASE}/services/add`, {
      title: newService.value.title,
      image_url: imageUrl
    });

    // Reset
    newService.value.title = "";
    file.value = null;
    preview.value = null;
    await loadServices();
  } catch (err) {
    console.error("Error adding service:", err);
    alert("Failed to add service");
  } finally {
    loading.value = false;
  }
};

const loadServices = async () => {
  try {
    const res = await axios.get(`${API_BASE}/services`);
    services.value = res.data;
  } catch (err) {
    console.error("Error loading services:", err);
  }
};

const deleteService = async (id) => {
  if (!confirm("Delete this service tab?")) return;
  try {
    await axios.delete(`${API_BASE}/services/${id}`);
    await loadServices();
  } catch (err) {
    console.error("Error deleting service:", err);
  }
};

onMounted(loadServices);
</script>

<style scoped>
.page-container {
  padding: 30px;
  color: #ffffff;
  background: #060617;
  min-height: 100vh;
}

.title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 25px;
  color: #a45cff;
}

.upload-card {
  background: #0c0c22;
  padding: 25px;
  border-radius: 14px;
  margin-bottom: 35px;
  border: 1px solid rgba(164, 92, 255, 0.2);
  max-width: 600px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #d6d6ff;
}

.text-input {
  width: 100%;
  padding: 12px;
  background: #060617;
  border: 1px solid rgba(164, 92, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  outline: none;
}

.text-input:focus {
  border-color: #a45cff;
}

.file-input {
  color: #d6d6ff;
}

.upload-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.preview-box {
  margin-top: 20px;
}

.preview-box img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  border: 1px solid rgba(164, 92, 255, 0.5);
}

.grid-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.service-card {
  background: #0c0c22;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: #a45cff;
}

.service-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-info {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-info h4 {
  margin: 0;
  font-size: 18px;
}

.delete-btn {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.delete-btn:hover {
  background: #ff4444;
  color: #fff;
}
</style>
