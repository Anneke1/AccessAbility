<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
const route = useRoute();

const isOpen = ref(false);
const isDesktop = ref(true);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
function closeMenu() {
  isOpen.value = false;
}

// Fenstergröße beobachten (für SSR sicher)
function handleResize() {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) isOpen.value = false;
}
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <header class="bg-primary sticky top-0 z-50 shadow-md">
    <nav
      class="custom-container py-4 flex items-center justify-between flex-wrap"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg
          src="/img/Logo.png"
          alt="Logo"
          class="h-24 w-26 object-contain"
        />
      </NuxtLink>

      <!-- Burger-Button nur auf Mobil -->
      <button
        class="text-white text-3xl md:hidden focus:outline-none"
        @click="toggleMenu"
        aria-label="Menü öffnen oder schließen"
      >
        ☰
      </button>

      <!-- Navigation -->
      <ul
        class="navlinks gap-4 mt-4 md:mt-0 w-full md:w-auto"
        :class="[
          isOpen || isDesktop ? 'flex' : 'hidden',
          isDesktop ? 'flex-row' : 'flex-col',
        ]"
      >
        <li>
          <NuxtLink
            to="/"
            class="navlink"
            exact-active-class="activeLink"
            :aria-current="$route.path === '/' ? 'page' : null"
            @click="closeMenu"
          >
            Start
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/tipps"
            class="navlink"
            exact-active-class="activeLink"
            :aria-current="$route.path === '/tipps' ? 'page' : null"
            @click="closeMenu"
          >
            Tipps
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/glossar"
            class="navlink"
            exact-active-class="activeLink"
            :aria-current="$route.path === '/glossar' ? 'page' : null"
            @click="closeMenu"
          >
            Wörterbuch
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/suche"
            class="navlink flex items-center gap-1"
            exact-active-class="activeLink"
            :aria-current="$route.path === '/suche' ? 'page' : null"
            @click="closeMenu"
          >
            <NuxtImg
              class="w-5"
              :src="
                route.path === '/suche'
                  ? '/img/Lupe-aktiv.png'
                  : '/img/Lupe.png'
              "
              alt=""
            />
            <span>Suche</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
