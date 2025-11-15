<template>
  <div class="home">

    <!-- 🔹 Hero -->
    <section class="hero">
      <h1>Avado Tech</h1>
      <p>Custom Website • Fast • Secure</p>
      <div class="actions">
        <button class="btn primary">Get Started</button>
        <button class="btn outline">Our Work</button>
      </div>
    </section>

    <!-- 🔥 Banner Slider -->
    <section class="banner-area">
      <BannerSlider />
    </section>

    <!-- 🔹 Services -->
    <section class="services">
      <h2>Our Services</h2>

      <div class="cards">
        <div class="card">
          <h3>eCommerce Website</h3>
          <p>Fast, mobile-friendly online store with admin panel.</p>
        </div>

        <div class="card">
          <h3>Business Website</h3>
          <p>Modern company or portfolio site for your brand.</p>
        </div>

        <div class="card">
          <h3>Custom Solutions</h3>
          <p>Booking, inventory, dashboard & custom features.</p>
        </div>
      </div>
    </section>

    <!-- 🔹 CTA -->
    <section class="cta">
      <h2>Need a Website?</h2>
      <p>Message us to plan your project.</p>
      <button class="btn primary">Contact Now</button>
    </section>

  </div>
</template>

<script setup>
import BannerSlider from "../components/BannerSection.vue";
</script>

<style scoped>
.home {
  font-family: system-ui;
  background: #050015;
  color: #fff;
}

/* HERO */
.hero {
  text-align: center;
  padding: 5rem 1rem 3rem;
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
}
.hero h1 {
  font-size: 2.3rem;
  margin-bottom: 0.4rem;
}
.hero p {
  opacity: 0.85;
  margin-bottom: 1.5rem;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* BANNER */
.banner-area {
  margin: 1.5rem 1rem;
}

/* BUTTONS */
.btn {
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
}
.primary {
  background: #fff;
  color: #4a00e0;
  font-weight: 600;
}
.outline {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
}

/* SERVICES */
.services {
  padding: 3rem 1rem;
  text-align: center;
}
.cards {
  margin-top: 1.5rem;
  display: grid;
  gap: 1rem;
}
.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.2rem;
  border-radius: 1rem;
}
.card h3 {
  margin-bottom: 0.4rem;
}

/* CTA */
.cta {
  margin: 3rem 1rem;
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 1.2rem;
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
}
.cta h2 {
  margin-bottom: 0.3rem;
}
</style>
