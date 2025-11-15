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
    : "https://your-backend-domain.com/api";

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

// Load banners
const loadBanners = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/banners`);
    banners.value = res.data;
  } catch (err) {
    console.error("Load banners error:", err);
  }
  loading.value = false;
};

onMounted(loadBanners);

// File choose handler (THIS MUST WORK NOW)
const handleFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  selectedFile.value = file;
};

// Upload file to R2
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

// Save banner to DB
const addBanner = async () => {
  if (!form.value.image_url) return;

  saving.value = true;
  try {
    await axios.post(`${API_BASE}/banners`, form.value);
    form.value = { image_url: "", title: "", button_text: "", button_link: "" };
    loadBanners();
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
    loadBanners();
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
    loadBanners();
  } catch (err) {
    console.error("Update error:", err);
  }
};
</script>

<style scoped>
.banner-admin {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  color: #fff;
  font-family: system-ui;
}
.title {
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

/* CARD */
.card {
  background: #0b0b1c;
  border-radius: 1rem;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid #222;
}

/* FILE UPLOAD BUTTON */
.file-label {
  position: relative;
  display: inline-block;
  padding: 0.7rem 1.2rem;
  background: #4a00e0;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 0.9rem;
  user-select: none;
  margin-bottom: 10px;
}

.file-label input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0; /* Invisible but clickable */
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* INPUTS */
.input {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background: #131326;
  color: #fff;
  font-size: 0.9rem;
}

/* BUTTONS */
.btn {
  margin-top: 0.4rem;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  background: #33335a;
  color: #fff;
}
.btn.primary {
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
}
.btn.small {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}
.btn.danger {
  background: #b30021;
}

/* PREVIEW */
.preview img {
  width: 220px;
  max-width: 100%;
  border-radius: 0.7rem;
  margin-top: 0.4rem;
}

/* BANNER LIST */
.banner-row {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: 0.8rem;
  padding: 0.7rem;
  border-radius: 0.8rem;
  background: #111122;
}
.thumb {
  width: 130px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* MODAL */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  background: #0d0d20;
  padding: 1.2rem;
  border-radius: 1rem;
  width: 320px;
}
.edit-thumb {
  width: 100%;
  border-radius: 0.7rem;
  margin-bottom: 0.7rem;
}
.modal-actions {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
}
</style>
