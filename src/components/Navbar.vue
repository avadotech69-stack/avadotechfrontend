<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Left Section: Logo & Brand -->
      <div class="nav-left" @click="scrollToTop">
        <div class="logo-wrapper">
          <img src="../assets/logo5.png" alt="avadotech" class="logo" />
        </div>
        <span class="brand-name">Avado Tech</span>
      </div>

      <!-- Middle Section: Capsule Navigation -->
      <div class="nav-middle">
        <div class="capsule" ref="capsuleRef">
          <!-- Dynamic Premium Glow Effect (Matched 100% to Image) -->
          <div 
            class="capsule-light" 
            :style="{ 
              left: lightPos.left + 'px', 
              opacity: lightPos.opacity 
            }"
          ></div>
          
          <div class="nav-items-wrapper">
            <a 
              v-for="(item, index) in navItems" 
              :key="item.name"
              :href="item.link"
              class="nav-item"
              :class="{ active: item.active }"
              @click.prevent="handleNavClick(index, item.link)"
              :ref="el => { if (item.active) activeItemRef = el }"
            >
              {{ item.name }}
              <svg v-if="item.hasDropdown" class="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Section: Placeholder for Centering / Mobile Toggle -->
      <div class="nav-right-placeholder">
        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg v-if="!mobileMenuOpen" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ 'is-open': mobileMenuOpen }">
      <div class="mobile-nav-items">
        <a 
          v-for="(item, index) in navItems" 
          :key="item.name"
          :href="item.link"
          class="mobile-nav-item"
          :class="{ active: item.active }"
          @click.prevent="handleNavClick(index, item.link); mobileMenuOpen = false"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const mobileMenuOpen = ref(false);

const navItems = ref([
  { name: 'Home', link: '#home', active: true },
  { name: 'Services', link: '#services', active: false },
  { name: 'Works', link: '#works', active: false },
  { name: 'Pricing', link: '#pricing', active: false },
]);

const capsuleRef = ref(null);
const activeItemRef = ref(null);
const lightPos = ref({ left: 0, opacity: 0 });

const updateLight = () => {
  if (activeItemRef.value && capsuleRef.value) {
    const capsuleRect = capsuleRef.value.getBoundingClientRect();
    const activeRect = activeItemRef.value.getBoundingClientRect();
    
    // Calculate the center point of the active item relative to the capsule
    const relativeCenter = (activeRect.left - capsuleRect.left) + (activeRect.width / 2);
    
    lightPos.value = {
      left: relativeCenter,
      opacity: 1
    };
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setActive(0);
};

const scrollToSection = (id) => {
  if (id === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  const element = document.querySelector(id);
  if (element) {
    const offset = 80; // Navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const handleNavClick = (index, link) => {
  setActive(index);
  scrollToSection(link);
};

const setActive = (index) => {
  navItems.value.forEach((item, i) => {
    item.active = i === index;
  });
  nextTick(() => {
    updateLight();
  });
};

onMounted(() => {
  setTimeout(updateLight, 100);
  window.addEventListener('resize', updateLight);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@200..700&display=swap');

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: transparent;
  font-family: 'Inter', sans-serif; /* Default font */
}

.nav-container {
  width: 100%;
  max-width: none;
  padding: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Left: Logo & Brand */
.nav-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.brand-name {
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  font-size: 24px; /* Increased slightly for Oswald */
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Middle: Capsule Navigation */
.nav-middle {
  position: relative;
}

.capsule {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: visible;
}

/* 100% Match to Reference Image */
.capsule-light {
  position: absolute;
  top: -1px; /* Aligned with top border */
  height: 45px;
  width: 120px; /* Spread wider than the item */
  background: radial-gradient(
    50% 100% at 50% 0%, 
    rgba(168, 85, 247, 0.6) 0%, 
    rgba(168, 85, 247, 0.2) 40%, 
    transparent 100%
  );
  filter: blur(5px);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
  transform: translateX(-50%); /* Centered on the target point */
}

/* The bright neon line at the top center */
.capsule-light::after {
  content: "";
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, #e9d5ff, transparent);
  box-shadow: 0 0 12px 1px #a855f7;
  border-radius: 100px;
}

.capsule:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.nav-items-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.nav-item {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 100px;
  font-family: 'Oswald', sans-serif;
  font-size: 16px; /* Adjusted for Oswald */
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item.active {
  color: #ffffff;
}

.dropdown-icon {
  opacity: 0.5;
  margin-top: 1px;
}

.nav-right-placeholder {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 5px;
  z-index: 2000;
}

.mobile-menu {
  display: none;
}

/* Mobile Responsiveness */
@media (max-width: 960px) {
  .nav-container {
    padding: 0 5%;
  }
  .nav-middle {
    display: none;
  }
  .brand-name {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
  
  /* Mobile Menu Overlay Styles */
  .mobile-menu {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(6, 6, 23, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 999; /* Below navbar header */
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    align-items: center;
    justify-content: center;
  }
  
  .mobile-menu.is-open {
    opacity: 1;
    pointer-events: all;
  }
  
  .mobile-nav-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .mobile-menu.is-open .mobile-nav-items {
    transform: translateY(0);
  }
  
  .mobile-nav-item {
    font-family: 'Oswald', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.3s;
  }
  
  .mobile-nav-item.active,
  .mobile-nav-item:hover {
    color: #a45cff;
    text-shadow: 0 0 20px rgba(164, 92, 255, 0.5);
  }
}
</style>
