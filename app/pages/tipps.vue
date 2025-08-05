<script setup>
import tippsDaten from "../public/data/tippsDaten.json";
import sections from "../public/data/sections.json";
import subcategories from "../public/data/subcategories.json";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";

const quizState = reactive({});
const route = useRoute();
const openTipps = ref([]);

// Methoden
onMounted(() => {
  const hash = route.hash; // z. B. "#tipp-123"
  if (hash && hash.startsWith("#tipp-")) {
    const idStr = hash.replace("#tipp-", "");
    const id = parseInt(idStr);
    if (!isNaN(id)) {
      const el = document.getElementById(`tipp-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        if (!openTipps.value.includes(id)) {
          openTipps.value.push(id); // <details> öffnen
        }
      }
    }
  }
});

const getSubcategoriesByGroup = (groupId) =>
  subcategories.filter((s) => s.groupId.startsWith(groupId + "."));

const getTipsBySubId = (subcategoryGroupId) =>
  tippsDaten.filter((t) => t.groupId === subcategoryGroupId);

const getTipsByGroupId = (groupId) =>
  tippsDaten.filter((t) => t.groupId === groupId);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const handleAnswer = (tipId, selectedOption, correctAnswer) => {
  if (!quizState[tipId]) {
    quizState[tipId] = {
      selected: null,
      correct: null,
    };
  }

  quizState[tipId].selected = selectedOption;
  quizState[tipId].correct = selectedOption === correctAnswer;
};

const handleToggle = (
  event,
  tipId = null,
  isSubcategory = false,
  subGroupId = null
) => {
  // Einzelnen Tipp schließen: Quizzustand löschen
  if (!event.target.open && tipId !== null && !isSubcategory) {
    delete quizState[tipId];
  }

  // Wenn eine Subkategorie geschlossen wird:
  if (!event.target.open && isSubcategory && subGroupId) {
    // Alle Tipps dieser Subkategorie schließen und Zustand löschen
    const tipsToReset = getTipsByGroupId(subGroupId);
    tipsToReset.forEach((tip) => {
      // Quizzustand entfernen
      if (quizState[tip.id]) {
        delete quizState[tip.id];
      }

      // Falls der Tipp geöffnet ist → schließen
      const index = openTipps.value.indexOf(tip.id);
      if (index !== -1) {
        openTipps.value.splice(index, 1);
      }
    });
  }
};
</script>

<template>
  <section class="inhalt">
    <h1 class="text-6xl font-bold">Tools</h1>
    <p class="text-xl text-block">
      Im Folgenden werden zwei nützliche Werkzeuge vorgestellt, die dabei
      helfen, Webseiten auf ihre Barrierefreiheit zu überprüfen. Beide Tools
      bieten unterschiedliche Funktionen und Herangehensweisen, um Probleme
      sichtbar zu machen und zu analysieren. Schau dir die Hilfsmittel gerne
      genauer an.
    </p>

    <div class="card-tipps-grid">
      <!-- WAVE -->
      <div class="card-tipps-block">
        <a href="/glossar" class="card-tipps">
          <div class="card-image-wrapper">
            <NuxtImg src="/img/WAVELogo.png" class="card-image-tipps" />
          </div>
        </a>
        <p class="card-text">
          Dieses Werkzeug visualisiert Barrierefreiheitsprobleme direkt auf der
          Webseite und macht Fehler sowie Verbesserungspotenziale leicht
          erkennbar. Es bietet eine übersichtliche Darstellung von Warnungen,
          Fehlern und Hinweisen, die Entwicklern helfen, die
          Nutzerfreundlichkeit für Menschen mit Behinderungen zu verbessern. Mit
          seiner intuitiven Oberfläche eignet es sich gut für schnelle Prüfungen
          und detaillierte Analysen.
        </p>
      </div>

      <!-- AChecker -->
      <div class="card-tipps-block">
        <a href="/tipps" class="card-tipps">
          <div class="card-image-wrapper">
            <NuxtImg src="/img/ACheckerLogo.png" class="card-image-tipps" />
          </div>
        </a>
        <p class="card-text">
          Dieses Tool analysiert Webseiten gründlich auf
          Barrierefreiheitsprobleme und zeigt Fehler sowie
          Verbesserungspotenziale strukturiert auf. Es erstellt verständliche
          Berichte mit konkreten Hinweisen, die Entwickler:innen helfen,
          bekannte Standards einzuhalten und Barrieren gezielt zu beheben. Mit
          seinem klaren Aufbau eignet es sich gut für detaillierte Auswertungen
          und die kontinuierliche Verbesserung digitaler Zugänglichkeit.
        </p>
      </div>
    </div>

    <!-- Unterschiede -->
    <h2 class="section-heading absatz">
      Unterschiede zwischen WAVE und AChecker
    </h2>
    <p class="text-xl text-block">
      AChecker und WAVE sind zwei Werkzeuge zur Überprüfung der Barrierefreiheit
      von Webseiten, sie verfolgen jedoch unterschiedliche Ansätze. WAVE bietet
      eine visuelle Prüfung direkt auf der Seite und ist besonders
      benutzer:innen-freundlich, AChecker hingegen liefert eine detaillierte,
      technisch orientierte Analyse. Während WAVE automatisch erkannte Probleme
      farblich hervorhebt, gliedert AChecker seine Ergebnisse in überprüfbare
      Kategorien und erlaubt auch eine lokale Nutzung. Beide Tools ergänzen sich
      gut, um Webinhalte barrierefrei zu gestalten.
    </p>

    <!-- POUR-Teil -->

    <h2 class="section-heading absatz mt-4">Tipps zur Umsetzung</h2>
    <p class="text-xl text-block">
      Barrierefreiheit im digitalen Raum bedeutet, dass Webseiten und digitale
      Inhalte für alle Menschen nutzbar sind, unabhängig von körperlichen,
      sensorischen oder kognitiven Einschränkungen. Um das zu gewährleisten,
      gibt es die WCAG, die Web Content Accessibility Guidelines. Diese
      Richtlinien basieren auf dem sogenannten POUR-Prinzip, das vier zentrale
      Anforderungen an barrierefreie Inhalte definiert:
    </p>

    <!-- POUR-Visualisierung -->
    <div class="pour-grid mt-10 mb-10">
      <div class="pour-item">
        <span class="section-heading text-cyan-900">P</span>
        <span class="text-xl">für Perceivable (wahrnehmbar)</span>
      </div>
      <div class="pour-item">
        <span class="section-heading text-cyan-900">O</span>
        <span class="text-xl">für Operable (bedienbar)</span>
      </div>
      <div class="pour-item">
        <span class="section-heading text-cyan-900">U</span>
        <span class="text-xl">für Understandable (verständlich)</span>
      </div>
      <div class="pour-item">
        <span class="section-heading text-cyan-900">R</span>
        <span class="text-xl">für Robust (robust gegenüber Technik)</span>
      </div>
    </div>

    <div class="absatz">
      <div
        v-for="section in sections"
        :key="section.id"
        class="mb-10 border rounded-lg overflow-hidden"
      >
        <!-- Abschnittstitel -->
        <div
          class="px-4 py-3 bg-gray-100 text-xl font-bold flex items-center gap-2"
          :class="section.color"
        >
          <img v-if="section.image" :src="section.image" class="w-14 h-14" />
          {{ section.title }}
        </div>

        <!-- Unterkategorien + Tipps -->
        <div>
          <details
            v-for="subcategory in getSubcategoriesByGroup(section.groupId)"
            :key="subcategory.id"
            class="group border-t"
            @toggle="handleToggle($event, null, true, subcategory.groupId)"
          >
            <summary
              class="cursor-pointer px-4 py-3 hover:bg-gray-50 flex justify-between items-center text-base font-semibold"
            >
              <div class="flex items-center gap-2">
                <img
                  v-if="subcategory.image"
                  :src="subcategory.image"
                  class="w-14 h-14"
                />
                <span>{{ subcategory.title }}</span>
              </div>
              <img
                src="/img/open.png"
                class="w-6 h-6 transition-transform duration-200 transform group-open:rotate-180"
              />
            </summary>

            <!-- Tipps innerhalb der Subkategorie -->
            <div class="bg-white px-4 py-3 space-y-3">
              <details
                v-for="tip in getTipsByGroupId(subcategory.groupId)"
                :open="openTipps.includes(tip.id)"
                @toggle="handleToggle($event, tip.id)"
                :id="`tipp-${tip.id}`"
                class="group/tip border border-gray-100 rounded"
                :key="tip.id"
              >
                <summary
                  class="cursor-pointer flex justify-between items-center text-sm font-medium py-2 px-2 rounded hover:bg-gray-50"
                >
                  <div class="flex gap-2 items-center">
                    <span>{{ tip.title }}</span>
                  </div>
                  <img
                    src="/img/open.png"
                    class="w-6 h-6 transition-transform duration-200 transform group/tip-open:rotate-180"
                  />
                </summary>
                <div class="ml-4 mt-2 mb-2 text-sm text-gray-700 text-justify">
                  <div class="tipp-inhalt space-y-4">
                    <div v-if="tip.Why">
                      <strong>Warum?</strong>
                      <p>{{ tip.Why }}</p>
                    </div>

                    <div v-if="tip.WhatToDo">
                      <strong>Was tun?</strong>
                      <p>{{ tip.WhatToDo }}</p>
                    </div>

                    <div v-if="tip.example">
                      <strong>Beispiel:</strong>
                      <div
                        class="border border-black p-4 font-mono text-sm rounded whitespace-pre-wrap text-left"
                      >
                        {{ tip.example }}
                      </div>
                      <div v-if="tip.exampleExplanation" class="mt-2 text-sm">
                        {{ tip.exampleExplanation }}
                      </div>
                    </div>
                    <!--Interaktion-->
                    <section>
                      <!-- TRUE/FALSE -->
                      <div
                        v-if="
                          tip.interaction &&
                          tip.interaction.type === 'truefalse'
                        "
                      >
                        <strong>Aussage:</strong>
                        <p>{{ tip.interaction.statement }}</p>

                        <div class="flex gap-4">
                          <button
                            @click="
                              handleAnswer(
                                tip.id,
                                true,
                                tip.interaction.correctAnswer
                              )
                            "
                            :class="[
                              'w-full px-4 py-2 border rounded font-semibold text-center flex justify-between items-center transition-all duration-300',
                              quizState[tip.id]?.selected === true
                                ? quizState[tip.id]?.correct
                                  ? 'bg-green-200 border-green-500'
                                  : 'bg-red-200 border-red-500 animate-shake'
                                : 'hover:bg-gray-50',
                            ]"
                          >
                            <span>Wahr</span>
                            <span v-if="quizState[tip.id]?.selected === true">
                              {{ quizState[tip.id]?.correct ? "✅" : "❌" }}
                            </span>
                          </button>

                          <button
                            @click="
                              handleAnswer(
                                tip.id,
                                false,
                                tip.interaction.correctAnswer
                              )
                            "
                            :class="[
                              'w-full px-4 py-2 border rounded font-semibold text-center flex justify-between items-center transition-all duration-300',
                              quizState[tip.id]?.selected === false
                                ? quizState[tip.id]?.correct
                                  ? 'bg-green-200 border-green-500'
                                  : 'bg-red-200 border-red-500 animate-shake'
                                : 'hover:bg-gray-50',
                            ]"
                          >
                            <span>Falsch</span>
                            <span v-if="quizState[tip.id]?.selected === false">
                              {{ quizState[tip.id]?.correct ? "✅" : "❌" }}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div
                        v-if="
                          tip.interaction && tip.interaction.type === 'quiz'
                        "
                      >
                        <strong>Quiz:</strong>
                        <p class="mt-1 mb-1">{{ tip.interaction.question }}</p>

                        <ul class="space-y-2">
                          <li
                            v-for="(option, index) in tip.interaction.options"
                            :key="index"
                            @click="
                              handleAnswer(
                                tip.id,
                                option,
                                tip.interaction.correctAnswer
                              )
                            "
                            :class="[
                              'cursor-pointer p-2 border rounded transition-all duration-300 select-none flex justify-between items-center',
                              quizState[tip.id]?.selected === option
                                ? quizState[tip.id]?.correct
                                  ? 'bg-green-200 border-green-500'
                                  : 'bg-red-200 border-red-500 animate-shake'
                                : 'hover:bg-gray-50',
                            ]"
                          >
                            <span>{{ option }}</span>
                            <span v-if="quizState[tip.id]?.selected === option">
                              {{ quizState[tip.id]?.correct ? "✅" : "❌" }}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
              </details>
            </div>
          </details>
        </div>
      </div>
    </div>
    <!-- Scroll to Top Button -->
    <button
      class="scroll-top-button"
      @click="scrollToTop"
      aria-label="Nach oben scrollen"
    >
      ↑
    </button>
  </section>
</template>
