<template>
  <div class="banner-admin">
    <h1 class="title">Banner Manager</h1>

    <!-- 🔹 Add / Upload Banner -->
    <div class="card">
      <h3>Add New Banner</h3>

      <!-- File Upload Button -->
      <label class="file-label">
        <span>Select Banner Image</span>
        <input type="file" accept="image/*" @change="handleFile" />
      </label>

      <button
        class="btn"
        @click="uploadImage"
        :disabled="!selectedFile || uploading"
      >
        <span v-if="!uploading">Upload to R2</span>
        <span v-else>Uploading...</span>
      </button>

      <div v-if="form.image_url" class="preview">
        <p>Preview:</p>
        <img :src="form.image_url" alt="Banner preview" />
      </div>

      <input v-model="form.title" placeholder="Title (optional)" class="input" />
      <input
        v-model="form.button_text"
        placeholder="Button text (optional)"
        class="input"
      />
      <input
        v-model="form.button_link"
        placeholder="Button link (optional)"
        class="input"
      />

      <button
        class="btn primary"
        @click="addBanner"
        :disabled="!form.image_url || saving"
      >
        <span v-if="!saving">Save Banner</span>
        <span v-else>Saving...</span>
      </button>
    </div>

    <!-- 🔹 Banner List -->
    <div class="card">
      <h3>All Banners</h3>

      <div v-if="loading">Loading banners...</div>

      <div v-if="!loading && !banners.length">No banners found.</div>

      <div v-for="banner in banners" :key="banner.id" class="banner-row">
        <img :src="banner.image_url" class="thumb" />

        <div class="info">
          <p><strong>ID:</strong> {{ banner.id }}</p>
          <p><strong>Title:</strong> {{ banner.title || "—" }}</p>
          <p><strong>Button:</strong> {{ banner.button_text || "—" }}</p>
          <p class="link">
            <strong>Link:</strong> <span>{{ banner.button_link || "—" }}</span>
          </p>
        </div>

        <div class="row-actions">
          <button class="btn small" @click="startEdit(banner)">Edit</button>
          <button class="btn small danger" @click="deleteBanner(banner.id)">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- 🔹 Edit Modal -->
    <div v-if="editing" class="modal">
      <div class="modal-box">
        <h3>Edit Banner</h3>

        <img :src="editForm.image_url" class="edit-thumb" />

        <input v-model="editForm.title" placeholder="Title" class="input" />
        <input
          v-model="editForm.button_text"
          placeholder="Button text"
          class="input"
        />
        <input
          v-model="editForm.button_link"
          placeholder="Button link"
          class="input"
        />

        <div class="modal-actions">
          <button class="btn primary" @click="updateBanner">Save</button>
          <button class="btn danger" @click="editing = false">Cancel</button>
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
const loading = ref(false);
const uploading = ref(false);
const saving = ref(false);

const selectedFile = ref(null);

const form = ref({
  image_url: "",
  title: "",
  button_text: "",
  button_link: "",
});

const editing = ref(false);
const editForm = ref({});

// ✅ Load banners (D1 compatible)
const loadBanners = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/banners`);
    console.log("BANNER API RESPONSE:", res.data);
    banners.value = res.data.banners || [];
  } catch (err) {
    console.error("Load banners error:", err);
    banners.value = [];
  }
  loading.value = false;
};

onMounted(loadBanners);

// File choose handler
const handleFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  selectedFile.value = file;
};

// Upload to R2
const uploadImage = async () => {
  if (!selectedFile.value) return;

  uploading.value = true;
  try {
    const fd = new FormData();
    fd.append("image", selectedFile.value);

    const res = await axios.post(`${API_BASE}/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    form.value.image_url = res.data.url;
    selectedFile.value = null;
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed!");
  }
  uploading.value = false;
};

// Save banner
const addBanner = async () => {
  if (!form.value.image_url) return;

  saving.value = true;
  try {
    await axios.post(`${API_BASE}/banners`, form.value);
    form.value = { image_url: "", title: "", button_text: "", button_link: "" };
    await loadBanners();
  } catch (err) {
    console.error("Save banner error:", err);
  }
  saving.value = false;
};

// Delete banner
const deleteBanner = async (id) => {
  if (!confirm("Delete banner?")) return;

  try {
    await axios.delete(`${API_BASE}/banners/${id}`);
    await loadBanners();
  } catch (err) {
    console.error("Delete error:", err);
  }
};

// Edit banner
const startEdit = (banner) => {
  editing.value = true;
  editForm.value = { ...banner };
};

const updateBanner = async () => {
  try {
    await axios.put(`${API_BASE}/banners/${editForm.value.id}`, editForm.value);
    editing.value = false;
    await loadBanners();
  } catch (err) {
    console.error("Update error:", err);
  }
};
</script>
