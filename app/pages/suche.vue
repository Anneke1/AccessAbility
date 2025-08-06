<script setup lang="ts">
import { ref, computed } from "vue";
const query = ref("");
const showResults = ref(false);
const showSuggestions = ref(false);
const activeSuggestionIndex = ref(-1);

interface Definition {
  id: number;
  title: string;
}

// JSON-Datei laden:
const {
  data: definitionen,
  pending,
  error,
} = await useFetch("/data/definitionen.json", { server: false });

const { data: tippsDaten, error: tippsError } = await useFetch(
  "/data/tippsDaten.json",
  { server: false }
);

const alleDaten = computed(() => {
  const defs = definitionen.value || [];
  const tipps = tippsDaten.value || [];

  const mappedDefs = defs.map((item) => ({
    ...item,
    type: "definition",
  }));

  const mappedTipps = tipps.map((item) => ({
    id: item.id,
    title: item.title,
    type: "tipp",
  }));

  return [...mappedDefs, ...mappedTipps];
});

// Filterte Ergebnisse:
const results = computed(() => {
  if (!alleDaten.value) return [];
  const q = query.value.toLowerCase();
  return alleDaten.value.filter((item) => item.title.toLowerCase().includes(q));
});

// Vorschläge für Autocomplete (nur Titel, max 5)
const suggestions = computed(() => {
  if (!alleDaten.value || !query.value) return [];
  const q = query.value.toLowerCase();
  return alleDaten.value
    .filter((item) => item.title.toLowerCase().startsWith(q))
    .slice(0, 5);
});

function triggerSearch() {
  if (!query.value) return;
  showSuggestions.value = false;
  showResults.value = true; // Ergebnisse anzeigen nach Bestätigung
}

function selectSuggestion(s: Definition) {
  query.value = s.title;
  showSuggestions.value = false;
  showResults.value = true; // Ergebnisse nach Klick auf Vorschlag zeigen
}

function findDefinitionByTitle(title: string) {
  return definitionen.value?.some((def) => def.title === title);
}

function onKeyDown(event: KeyboardEvent) {
  if (!showSuggestions.value || !suggestions.value.length) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value + 1) % suggestions.value.length;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value - 1 + suggestions.value.length) %
      suggestions.value.length;
  } else if (event.key === "Enter") {
    if (activeSuggestionIndex.value >= 0) {
      selectSuggestion(suggestions.value[activeSuggestionIndex.value]);
    } else {
      triggerSearch();
    }
  } else if (event.key === "Escape") {
    showSuggestions.value = false;
  }
}

function onInput() {
  activeSuggestionIndex.value = -1;
  showResults.value = false;
  showSuggestions.value = !!query.value && suggestions.value.length > 0;
}
</script>

<template>
  <div class="search-container inhalt">
    <div class="search-bar">
      <input
        v-model="query"
        placeholder="Suchbegriff eingeben..."
        @input="onInput"
        @keydown="onKeyDown"
        @keydown.enter.prevent="triggerSearch"
        autocomplete="off"
      />
      <button @click="triggerSearch" aria-label="Suche starten">🔍</button>
    </div>

    <!-- Vorschläge nur beim Tippen, ohne Ergebnisse -->
    <ul v-if="showSuggestions" class="suggestions-list">
      <li
        v-for="(s, index) in suggestions"
        :key="s.id"
        @click="selectSuggestion(s)"
        :class="[
          'suggestion-item',
          { 'active-suggestion': index === activeSuggestionIndex },
        ]"
        :aria-selected="index === activeSuggestionIndex"
        role="option"
      >
        {{ s.title }}
      </li>
    </ul>

    <!-- Hinweis nur wenn keine Suche gestartet -->
    <div v-if="!query && !showResults && !pending" class="hint">
      Bitte geben Sie einen Suchbegriff ein...
    </div>

    <!-- Suchergebnisse erst nach Bestätigung -->
    <div v-if="showResults">
      <div v-if="pending" class="loading">Lade Daten...</div>
      <div v-if="error" class="error">Fehler beim Laden der Daten</div>

      <div v-if="results.length" class="results">
        <div
          v-for="item in results"
          :key="`${item.type}-${item.id}`"
          class="result-box"
        >
          <template v-if="item.type === 'definition'">
            <div class="glossar-link-box">
              Glossar &gt;
              <NuxtLink
                :to="`/glossar#${encodeURIComponent(item.title)}`"
                class="glossar-link"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </template>

          <template v-else-if="item.type === 'tipp'">
            <div class="glossar-link-box">
              Tipps &gt;
              <NuxtLink :to="`/tipps#tipp-${item.id}`" class="glossar-link">
                {{ item.title }}
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
      <div v-else-if="!pending && !error" class="no-results">
        Keine Ergebnisse gefunden.
      </div>
    </div>
  </div>
</template>
