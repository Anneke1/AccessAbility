<script setup lang="ts">
import { ref, computed } from "vue";

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

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id];
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <main class="inhalt">
    <h1 class="text-6xl font-bold">Wörterbuch</h1>
    <p class="glossar-description">
      Im Wörterbuch findest du wichtige Begriffe, Gesetze und Richtlinien rund
      um das Thema Barrierefreiheit. Es hilft dir dabei, Fachausdrücke besser zu
      verstehen und Zusammenhänge einzuordnen – egal ob du neu im Thema bist
      oder gezielt etwas nachschlagen möchtest.
    </p>

    <!-- Alphabet Navigation -->
    <nav aria-label="Alphabet Navigation" class="alphabet-nav mt-4">
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
      >
        {{ letter }}
      </button>
    </nav>

    <!-- Definitionen nach Buchstaben -->
    <div v-for="letter in alphabet" :key="letter">
      <section
        v-if="groupedDefinitions[letter]?.length"
        :id="letter"
        class="definition-section"
        :aria-labelledby="`heading-${letter}`"
      >
        <h2 :id="`heading-${letter}`" class="section-heading">{{ letter }}</h2>

        <div class="definition-list">
          <article
            v-for="definition in groupedDefinitions[letter]"
            :id="definition.title"
            :key="definition.id"
            class="definition-card"
            tabindex="0"
          >
            <div class="definition-header">
              <p class="definition-title">{{ definition.title }}</p>
              <button
                class="expand-button"
                @click="toggleExpand(definition.id)"
                :aria-expanded="expanded[definition.id] ? 'true' : 'false'"
                :aria-controls="`desc-${definition.id}`"
              >
                <img
                  :src="
                    expanded[definition.id]
                      ? '/img/arrow-down.png'
                      : '/img/arrow-right.png'
                  "
                  alt=""
                  class="chevron-img"
                />
              </button>
            </div>

            <div class="definition-divider"></div>

            <div
              v-show="expanded[definition.id]"
              class="definition-description"
              :id="`desc-${definition.id}`"
              role="region"
              :aria-hidden="!expanded[definition.id]"
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
