<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

const liveRegion = ref<HTMLElement | null>(null);

const { data: definitionen } = await useAsyncData("definitionen", async () => {
  const baseURL = process.server ? "http://localhost:3000" : "";
  const res = await fetch(`${baseURL}/data/definitionen.json`);
  if (!res.ok) throw new Error("Fehler beim Laden");
  return await res.json();
});

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const groupedDefinitions = computed(() => {
  const groups: Record<string, Array<any>> = {};
  for (const letter of alphabet) {
    groups[letter] =
      definitionen.value?.filter((def) =>
        def.title?.toUpperCase().startsWith(letter)
      ) || [];
  }
  return groups;
});

const expanded = ref<Record<string, boolean>>({});

async function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id];

  if (expanded.value[id]) {
    await nextTick(); // DOM-Update abwarten
    const def = definitionen.value?.find((d) => d.id === id);
    if (def && liveRegion.value) {
      liveRegion.value.textContent = `Definition von ${def.title}: ${def.description}`;
    }
  }
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = window.innerHeight / 3;

    window.scrollTo({
      top: rect.top + scrollTop - offset,
      behavior: "smooth",
    });

    // NEU: Fokus auf versteckten Anker setzen, damit Screenreader folgen
    const focusTarget = document.getElementById(`focus-${id}`);
    if (focusTarget) {
      setTimeout(() => {
        focusTarget.focus();
      }, 500); // nach Scrollanimation
    }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <main
    class="inhalt"
    aria-label="Glossar der Fachbegriffe zur Barrierefreiheit"
  >
    <h1 class="text-6xl font-bold">Wörterbuch</h1>
    <p class="glossar-description">
      Im Wörterbuch findest du wichtige Begriffe, Gesetze und Richtlinien rund
      um das Thema Barrierefreiheit. Es hilft dir dabei, Fachausdrücke besser zu
      verstehen und Zusammenhänge einzuordnen, egal ob du neu im Thema bist oder
      gezielt etwas nachschlagen möchtest.
    </p>

    <!-- Alphabet Navigation -->
    <nav aria-label="Alphabet Navigation" class="alphabet-nav mt-4">
      <a href="#glossar-inhalt" class="skip-link"
        >Direkt zum Glossar springen</a
      >

      <button
        v-for="letter in alphabet"
        :key="letter"
        :disabled="!groupedDefinitions[letter]?.length"
        :class="[
          'alphabet-button',
          { disabled: !groupedDefinitions[letter]?.length },
        ]"
        @click="scrollToId(letter)"
        :aria-disabled="!groupedDefinitions[letter]?.length"
        :aria-label="`Springe zu Begriffen mit ${letter}`"
      >
        {{ letter }}
      </button>
    </nav>

    <!-- Definitionen nach Buchstaben -->
    <div v-for="letter in alphabet" :key="letter" id="glossar-inhalt">
      <section
        v-if="groupedDefinitions[letter]?.length"
        :id="letter"
        class="definition-section"
        :aria-labelledby="`heading-${letter}`"
      >
        <!-- Unsichtbares Fokusziel -->
        <div :id="`focus-${letter}`" tabindex="-1" class="sr-only">
          {{ letter }} Abschnitt beginnt hier.
        </div>
        <h2 :id="`heading-${letter}`" class="section-heading">{{ letter }}</h2>

        <div class="definition-list">
          <article
            v-for="definition in groupedDefinitions[letter]"
            :id="definition.title"
            :key="definition.id"
            class="definition-card"
          >
            <button
              class="definition-header"
              @click="toggleExpand(definition.id)"
              :aria-expanded="expanded[definition.id] ? 'true' : 'false'"
            >
              <p class="definition-title" :id="`title-${definition.id}`">
                {{ definition.title }}
              </p>
              <span
                class="chevron-symbol"
                :class="{ rotated: expanded[definition.id] }"
              >
                ▸
              </span>
            </button>

            <div class="definition-divider"></div>

            <div
              v-show="expanded[definition.id]"
              :id="`desc-${definition.id}`"
              :aria-labelledby="`title-${definition.id}`"
            >
              {{ definition.description }}

              <!-- Optionaler Link -->
              <div v-if="definition.link" class="additional-info">
                <p>
                  Weitere Informationen bei
                  <a class="info-link" :href="'#' + definition.link">
                    {{ definition.link }}
                  </a>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
    <div aria-live="polite" class="sr-only" ref="liveRegion"></div>
    <!-- Scroll to Top Button -->
    <button
      class="scroll-top-button"
      @click="scrollToTop"
      aria-label="Nach oben scrollen"
    >
      ↑
    </button>
  </main>
</template>
