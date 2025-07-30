<script setup lang="ts">
import { ref, computed } from "vue";
const query = ref("");
const showResults = ref(false);
const showSuggestions = ref(false);

interface Definition {
  id: number;
  title: string;
}

// JSON-Datei laden:
const {
  data: definitionen,
  pending,
  error,
} = await useFetch("/data/definitionen.json");

// Filterte Ergebnisse:
const results = computed(() => {
  if (!definitionen.value) return [];
  const q = query.value.toLowerCase();
  return definitionen.value.filter((item) =>
    item.title.toLowerCase().includes(q)
  );
});

// Vorschläge für Autocomplete (nur Titel, max 5)
const suggestions = computed(() => {
  if (!definitionen.value || !query.value) return [];
  const q = query.value.toLowerCase();
  return definitionen.value
    .filter((item) => item.title.toLowerCase().startsWith(q))
    .slice(0, 5);
});

function onInput() {
  showResults.value = false; // Keine Ergebnisse anzeigen, solange nicht bestätigt
  showSuggestions.value = !!query.value && suggestions.value.length > 0;
}

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
</script>

<template>
  <div class="search-container inhalt">
    <div class="search-bar">
      <input
        v-model="query"
        placeholder="Suchbegriff eingeben..."
        @input="onInput"
        @keydown.enter.prevent="triggerSearch"
        autocomplete="off"
      />
      <button @click="triggerSearch" aria-label="Suche starten">🔍</button>
    </div>

    <!-- Vorschläge nur beim Tippen, ohne Ergebnisse -->
    <ul v-if="showSuggestions" class="suggestions-list">
      <li
        v-for="s in suggestions"
        :key="s.id"
        @click="selectSuggestion(s)"
        class="suggestion-item"
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
        <div v-for="item in results" :key="item.id" class="result-box">
          <!-- Wenn im Glossar vorhanden -->
          <template v-if="findDefinitionByTitle(item.title)">
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

          <!-- Falls kein Glossar-Eintrag vorhanden -->
          <template v-else>
            {{ item.title }}
          </template>
        </div>
      </div>
      <div v-else-if="!pending && !error" class="no-results">
        Keine Ergebnisse gefunden.
      </div>
    </div>
  </div>
</template>
