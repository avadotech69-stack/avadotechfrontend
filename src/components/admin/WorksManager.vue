<template>
  <div class="page-container">
    <h2 class="title">Works & Showcase Manager</h2>

    <!-- Add Work Form -->
    <div class="upload-card">
      <h3>Add New Work</h3>
      
      <div class="input-group">
        <label>Project Name</label>
        <input type="text" v-model="newWork.name" placeholder="e.g. Modern eCommerce UI" class="text-input" />
      </div>

      <div class="input-group">
        <label>Short Description</label>
        <textarea v-model="newWork.description" placeholder="Short description about the work..." class="text-input" rows="3"></textarea>
      </div>

      <div class="input-group">
        <label>Project Link (Optional)</label>
        <input type="text" v-model="newWork.link" placeholder="https://example.com" class="text-input" />
      </div>

      <div class="input-group">
        <label>Project Image</label>
        <input type="file" @change="handleFile" class="file-input" />
      </div>

      <button
        class="upload-btn"
        :disabled="loading || !file || !newWork.name"
        @click="addWork"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>Add Work</span>
      </button>

      <!-- Preview -->
      <div v-if="preview" class="preview-box">
        <p>Image Preview:</p>
        <img :src="preview" alt="Preview" />
      </div>
    </div>

    <!-- Works List -->
    <div class="grid-title">Current Works</div>
    <div class="work-grid">
      <div v-for="item in works" :key="item.id" class="work-card">
        <img :src="item.image_url" alt="work image" />
        <div class="card-info">
          <h4>{{ item.name }}</h4>
          <p class="desc">{{ item.description }}</p>
          <a v-if="item.link" :href="item.link" target="_blank" class="link-btn">View Link</a>
          <button class="delete-btn" @click="deleteWork(item.id)">Delete</button>
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

const works = ref([]);
const newWork = ref({ name: "", description: "", link: "" });
const file = ref(null);
const preview = ref(null);
const loading = ref(false);

const handleFile = (e) => {
  file.value = e.target.files[0];
  if (file.value) {
    preview.value = URL.createObjectURL(file.value);
  }
};

const addWork = async () => {
  if (!file.value || !newWork.value.name) return;
  loading.value = true;

  try {
    // 1. Upload image to R2
    const form = new FormData();
    form.append("image", file.value);
    const uploadRes = await axios.post(`${API_BASE}/upload`, form);
    const imageUrl = uploadRes.data.url;

    // 2. Save work to DB
    await axios.post(`${API_BASE}/works/add`, {
      name: newWork.value.name,
      description: newWork.value.description,
      link: newWork.value.link,
      image_url: imageUrl
    });

    // Reset
    newWork.value = { name: "", description: "", link: "" };
    file.value = null;
    preview.value = null;
    await loadWorks();
  } catch (err) {
    console.error("Error adding work:", err);
    alert("Failed to add work");
  } finally {
    loading.value = false;
  }
};

const loadWorks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/works`);
    works.value = res.data;
  } catch (err) {
    console.error("Error loading works:", err);
  }
};

const deleteWork = async (id) => {
  if (!confirm("Delete this work?")) return;
  try {
    await axios.delete(`${API_BASE}/works/${id}`);
    await loadWorks();
  } catch (err) {
    console.error("Error deleting work:", err);
  }
};

onMounted(loadWorks);
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
  font-family: inherit;
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

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.work-card {
  background: #0c0c22;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
}

.work-card:hover {
  transform: translateY(-5px);
  border-color: #a45cff;
}

.work-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-info h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.desc {
  font-size: 14px;
  color: #d6d6ff;
  margin-bottom: 15px;
  flex-grow: 1;
}

.link-btn {
  display: inline-block;
  color: #7a3fff;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 600;
}

.link-btn:hover {
  text-decoration: underline;
}

.delete-btn {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
  align-self: flex-start;
}

.delete-btn:hover {
  background: #ff4444;
  color: #fff;
}
</style>
