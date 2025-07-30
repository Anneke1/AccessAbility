<script setup lang="ts"></script>

<template>
  <footer class="bg-primary text-white py-12 mt-10">
    <div class="custom-container">
      <div class="footer-flex">
        <!-- Branding -->
        <div>
          <h1 class="footer-title">AccessAbility</h1>
        </div>

        <!-- Kontakt -->
        <div>
          <p class="footer-subtitle">KONTAKT</p>
          <a href="mailto:annekeclausen@gmail.com" class="navlink">
            annekeclausen@gmail.com
          </a>
        </div>

        <!-- Navigation -->
        <div>
          <p class="footer-subtitle">INFORMATIONEN</p>
          <ul class="flex flex-col gap-1">
            <li>
              <NuxtLink
                to="/about"
                class="navlink"
                exact-active-class="activeLink"
                >Über das Projekt</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/datenschutz"
                class="navlink"
                exact-active-class="activeLink"
                >Datenschutz</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/impressum"
                class="navlink"
                exact-active-class="activeLink"
                >Impressum</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
