<script setup lang="ts"></script>

<template>
  <main class="inhalt">
    <h1 id="Über das Projekt" class="font-bold text-4xl md:text-6xl mb-10">
      Über das Projekt
    </h1>

    <!-- Abschnitt 1 – Bild links, Text fließt rechts -->
    <section class="">
      <NuxtImg
        src="/img/Anneke.jpeg"
        alt="Bild der Erstellerin der Website"
        class="flow-image-left"
      />

      <p class="text-xl text-justify leading-relaxed">
        Diese Website ist im Rahmen meiner Bachelorarbeit entstanden und widmet
        sich dem Thema digitaler Barrierefreiheit. Ziel ist es, ein
        verständliches Informationsangebot zu schaffen, das Student:innen und
        Auszubildende dabei unterstützt, digitale Inhalte inklusiver zu
        gestalten. Digitale Barrierefreiheit betrifft uns alle, denn sie
        ermöglicht den gleichberechtigten Zugang zu Informationen, Kommunikation
        und digitalen Angeboten, unabhängig von individuellen körperlichen,
        kognitiven oder technischen Voraussetzungen.
      </p>
      <p class="text-xl text-justify leading-relaxed">
        Trotzdem wird sie in der Praxis häufig zu wenig oder nur oberflächlich
        behandelt. Genau hier setzt diese Website an. Sie möchte nicht nur für
        das Thema sensibilisieren, sondern auch konkrete, alltagstaugliche
        Hilfestellungen geben. Dabei wird besonderer Wert auf einfache Sprache,
        klare Beispiele und nachvollziehbare Erklärungen gelegt. Ziel ist es,
        Hemmschwellen abzubauen und deutlich zu machen: Barrierefreiheit ist
        keine Zusatzaufgabe, sondern ein grundlegender Bestandteil digitaler
        Gestaltung. Diese Website lädt dazu ein, sich mit digitalen Barrieren
        auseinanderzusetzen, eigene Inhalte kritisch zu hinterfragen und Schritt
        für Schritt inklusiver zu denken und zu handeln.
      </p>
    </section>

    <!-- Abschnitt 2 – Bild rechts, Text fließt links -->
    <section class="mt-10">
      <NuxtImg
        src="/img/Coding.jpeg"
        alt="Symbolbild Coding"
        class="flow-image-right"
      />

      <p class="text-xl text-justify leading-relaxed">
        Die Inhalte dieser Website wurden so aufbereitet, dass sie sowohl
        Einsteiger:innen als auch erfahrenere Menschen aus den Bereichen Design,
        Entwicklung und Barrierefreiheit gleichermaßen ansprechen. Dabei wird
        bewusst auf unterschiedliche Einstiegspunkte Rücksicht genommen, sei es
        die erste Auseinandersetzung mit dem Thema Barrierefreiheit oder der
        Wunsch, bestehende Kenntnisse zu vertiefen.
      </p>
      <p class="text-xl text-justify leading-relaxed">
        Der Fokus liegt nicht nur auf technischen Standards wie der WCAG oder
        gesetzlichen Anforderungen, sondern auch auf praxisnaher Unterstützung
        im Alltag: Gestaltungstipps, Hinweise zur barrierefreien Sprache,
        typische Fehlerquellen, hilfreiche Tools und anschauliche Beispiele
        sollen konkrete Impulse für die eigene Arbeit geben.
      </p>
      <p class="text-xl text-justify leading-relaxed">
        Neben dem "Was" steht hier vor allem das "Wie" im Vordergrund, also die
        Frage, wie sich Barrierefreiheit sinnvoll, effizient und nutzerzentriert
        umsetzen lässt. Die Inhalte orientieren sich an realen Szenarien aus
        Studium, Ausbildung und Berufspraxis, um den Transfer in die Anwendung
        zu erleichtern.
      </p>
      <p class="text-xl text-justify leading-relaxed">
        Ziel ist es, nicht nur Wissen zu vermitteln, sondern auch zum Nachdenken
        und Umdenken anzuregen, weg von der Vorstellung, Barrierefreiheit sei
        ein optionaler Zusatz, hin zu einer selbstverständlichen Grundlage
        digitaler Gestaltung. Ich hoffe, dass dich die Inhalte dabei
        unterstützen, Barrieren besser zu erkennen, einzuordnen und zu
        überwinden.
      </p>
    </section>
  </main>
</template>
