<template>
  <section class="pricing-section" id="pricing">
    <div class="pricing-container">
      
      <!-- 🟣 Section Header -->
      <div class="section-header">
        <h2 class="section-title">Pricing & <span class="highlight">Packages</span></h2>
        <div class="title-underline"></div>
        <p class="subtitle">Choose the perfect plan to accelerate your digital growth.</p>
      </div>

      <!-- 🟣 Pricing Grid -->
      <div class="pricing-grid">
        
        <!-- Card 1 -->
        <div class="pricing-card popular">
          <div class="popular-badge">Most Popular</div>
          <h3 class="card-title">Website + Landing Page</h3>
          <div class="price">
            <span class="amount">5500</span>
            <span class="currency">BDT</span>
            <span class="divider">/</span>
            <span class="amount-usd">$50</span>
          </div>
          <ul class="features">
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Super Fast Website</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Website + Landing Page Both in 1</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Domain Hosting 1 Year Included</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Free Maintenance 1 Year</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Fully Responsive Design</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> SEO Optimized</li>
          </ul>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="contact-btn primary">Contact Us</a>
        </div>

        <!-- Card 2 -->
        <div class="pricing-card">
          <h3 class="card-title">Website Recreation</h3>
          <div class="price">
            <span class="amount-text">Depends on Discuss</span>
          </div>
          <ul class="features">
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Make Your Old Website a Sales Machine</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Boost Conversion & High Sales Rate</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Modern UI/UX Redesign</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Performance & Speed Optimization</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Advanced Security Setup</li>
          </ul>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="contact-btn">Contact Us</a>
        </div>

        <!-- Card 3 -->
        <div class="pricing-card">
          <h3 class="card-title">Digital Marketing</h3>
          <div class="price">
            <span class="amount-text">Depends on Discuss</span>
          </div>
          <ul class="features">
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Facebook & Instagram Ads</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Google & YouTube Ads</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> TikTok Ads Campaigns</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Target Audience Optimization</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> High ROI & Sales Tracking</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Monthly Analytics Reports</li>
          </ul>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="contact-btn">Contact Us</a>
        </div>

        <!-- Card 4 -->
        <div class="pricing-card glow-card">
          <h3 class="card-title">Grow with Avado</h3>
          <div class="price">
            <span class="amount-text">Depends on Discuss</span>
          </div>
          <ul class="features">
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Complete Business Growth Strategy</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Premium Brand Identity Design</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Full-stack Web & App Development</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> End-to-end Marketing Funnel</li>
            <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> 24/7 Priority Support</li>
          </ul>
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="contact-btn">Contact Us</a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// WhatsApp link setup
const phoneNumber = "8801722371905";
const whatsappMessage = encodeURIComponent("Hello Avado Tech! I'm interested in your services.");
const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
</script>

<style scoped>
.pricing-section {
  padding: 100px 10%;
  background-color: #060617;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Background Ambient Lights */
.pricing-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(164, 92, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.pricing-section::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(122, 63, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.pricing-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 🟣 Header Styles */
.section-header {
  text-align: center;
  margin-bottom: 70px;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  line-height: 1.2;
}

.highlight {
  color: #a45cff;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  margin: 15px auto 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(164, 92, 255, 0.4);
}

.subtitle {
  color: #d6d6ff;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* 🟣 Grid Styles */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* 🟣 Card Styles */
.pricing-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.pricing-card:hover {
  transform: translateY(-10px);
  border-color: rgba(164, 92, 255, 0.3);
  box-shadow: 0 20px 40px rgba(122, 63, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
}

/* Popular Badge */
.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  color: #ffffff;
  padding: 6px 20px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(164, 92, 255, 0.4);
}

.pricing-card.popular {
  border-color: rgba(164, 92, 255, 0.4);
  background: rgba(164, 92, 255, 0.05);
}

/* Special Glow Card */
.pricing-card.glow-card:hover {
  border-color: #a45cff;
  box-shadow: 0 0 40px rgba(164, 92, 255, 0.2);
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #ffffff;
}

.price {
  margin-bottom: 30px;
  display: flex;
  align-items: baseline;
  gap: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 25px;
  min-height: 80px; /* To align uneven text vs numbers */
}

.amount {
  font-size: 42px;
  font-weight: 800;
  color: #a45cff;
  line-height: 1;
}

.currency {
  font-size: 16px;
  color: #d6d6ff;
  font-weight: 600;
}

.divider {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 5px;
}

.amount-usd {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.amount-text {
  font-size: 24px;
  font-weight: 700;
  color: #a45cff;
  line-height: 1.2;
}

/* Features List */
.features {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.features li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: #d6d6ff;
  line-height: 1.5;
}

.features svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #a45cff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Contact Button */
.contact-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box; /* 🔥 Ensures padding doesn't affect width calculation */
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  text-align: center;
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.contact-btn.primary {
  background: linear-gradient(90deg, #7a3fff, #a45cff);
  border: none;
  box-shadow: 0 10px 20px rgba(164, 92, 255, 0.3);
}

.contact-btn.primary:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 25px rgba(164, 92, 255, 0.4);
}

/* 🟣 Responsive Design */
@media (max-width: 1280px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .pricing-section {
    padding: 80px 5%;
  }
  
  .section-title {
    font-size: 36px;
  }
  
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
