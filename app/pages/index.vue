<template>
  <main>
    <!-- Hero-Bild mit Textüberlagerung -->
    <div class="relative w-full h-[1000px]">
      <NuxtImg
        src="/img/startbild.jpg"
        alt=""
        class="absolute inset-0 object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 flex items-center justify-start pl-10 inhalt"
      >
        <div class="space-y-4 max-w-xl">
          <h1 class="text-5xl footerText text-white">
            Willkommen zu AccessAbility
          </h1>
          <h2 class="text-2xl footerText text-white">
            Entdecke praktische Tipps, ein hilfreiches <br />
            Wörterbuch und fundierte Infos, um das <br />
            Web für alle zugänglicher zu machen.
          </h2>
        </div>
      </div>
    </div>

    <!-- Warum Barrierefreiheit -->
    <section aria-labelledby="warum-barrierefreiheit" class="inhaltSeite mt-10">
      <!-- Text links -->
      <div>
        <h2 id="warum-barrierefreiheit" class="section-heading">
          Warum Barrierefreiheit?
        </h2>
      </div>

      <!-- Bild rechts -->

      <NuxtImg src="/img/Diagramm.png" class="flow-image-right" alt="" />

      <p class="text-xl text-block mt-4">
        Barrierefreiheit im Netz ist kein Extra, sondern ein Menschenrecht. Wenn
        du Software oder Websites entwickelst, hast du einen direkten Einfluss
        darauf, ob Menschen ein digitales Angebot nutzen können oder
        ausgeschlossen werden.
      </p>
      <p class="text-xl text-block">
        Etwa zehn Millionen Menschen in Deutschland leben mit einer Form von
        Behinderung. Viele sind auf digitale Hilfsmittel wie Screenreader oder
        Sprachsteuerung angewiesen. Wenn Websites nicht barrierefrei gestaltet
        sind (z. B. ohne Alternativtexte, unlesbar für Screenreader oder nur per
        Maus bedienbar), schließt das diese Menschen aktiv aus, nicht nur bei
        Freizeitangeboten, sondern auch bei Bildung, Arbeit und staatlichen
        Leistungen.
      </p>
      <p class="text-xl text-block">
        Barrierefreiheit ist in der UN-Behindertenrechtskonvention verankert,
        die Deutschland ratifiziert hat. Sie verpflichtet uns, digitale Angebote
        so zu gestalten, dass sie unabhängig von körperlichen oder kognitiven
        Fähigkeiten zugänglich sind. Auch nationale Regelungen wie das
        Barrierefreiheitsstärkungsgesetz (BFSG) greifen diese Verpflichtung auf.
      </p>
      <p class="text-xl text-block">
        Über Gesetze hinaus geht es um Verantwortung. In einer digitalen
        Gesellschaft sollte Teilhabe nicht vom Zufall abhängen. Wenn du heute
        studierst oder eine Ausbildung machst, wirst du mitentscheiden, wie
        inklusiv die digitale Welt sein wird. Barrierefreiheit ist kein „nice to
        have“, sondern ein Zeichen von Respekt, Gerechtigkeit und digitaler
        Kompetenz.
      </p>
    </section>

    <!-- Lisa Erfahrungsbericht mit Bild -->
    <section class="inhaltSeite mt-10">
      <h2 class="section-heading mb-4">Hallo ich bin Susanna.</h2>

      <!-- Bild unter der Überschrift -->

      <NuxtImg src="/img/bericht.jpg" alt="" class="flow-image-left" />

      <!-- Text unter dem Bild, ganz links -->
      <p class="text-xl text-block mt-4">
        Ich bin 32 Jahre alt und von Geburt an stark sehbehindert. Ich nutze
        täglich das Internet, für meine Arbeit, zum Einkaufen, zur Information
        und für soziale Kontakte. Dabei bin ich auf Hilfsmittel wie eine
        Screenreader-Software und die Tastaturnavigation angewiesen. Leider
        stoße ich im Netz immer wieder auf Barrieren, die meine Teilhabe sehr
        einschränken.
      </p>
      <p class="text-xl text-block">
        Ein wiederkehrendes Problem sind schlecht strukturierte Webseiten. Viele
        Seiten verwenden keine korrekten HTML-Überschriften oder haben keine
        logische Reihenfolge der Inhalte. Für sehende Menschen ist das
        vielleicht kein Problem, sie sehen die Überschrift größer oder farblich
        abgesetzt. Aber mein Screenreader braucht klare Strukturinformationen,
        um mir zu sagen, wo ich bin und wie ich schnell zum gewünschten Inhalt
        komme. Auch Bilder ohne Alternativtexte sind ein häufiges Hindernis.
      </p>
      <p class="text-xl text-block">
        Formulare sind ein weiteres Beispiel: Viele haben keine korrekt
        beschrifteten Felder oder reagieren nur auf Mausaktionen. Ich kann dann
        gar nicht erkennen, was ich in welches Feld eintragen muss oder ich
        komme mit der Tastatur gar nicht erst in die Felder hinein. Besonders
        ärgerlich wird das bei wichtigen Vorgängen, wie dem Ausfüllen von
        Behördenformularen.
      </p>
      <p class="text-xl text-block">
        Auch Captchas stellen oft ein unüberwindbares Hindernis dar. Wenn es
        keine barrierefreie Alternative gibt, bleibe ich bei der Anmeldung
        einfach außen vor. Das frustriert mich, denn es zeigt mir immer wieder:
        Das Internet ist nicht für alle gemacht, obwohl es das sein sollte.
      </p>
      <p class="text-xl text-block">
        Gute Beispiele gibt es zwar, aber sie sind leider noch die Ausnahme. Ich
        wünsche mir, dass Entwickler:innen und Website-Betreiber:innen
        Barrierefreiheit nicht als Sonderfall, sondern als Standard betrachten.
        Schließlich profitieren alle von klarer Struktur, verständlicher Sprache
        und zugänglichem Design, nicht nur Menschen mit Behinderung.
      </p>
    </section>

    <section class="inhaltSeite">
      <h2 class="text-5xl font-bold mt-4">Was nun?</h2>
      <div class="card-tipps-grid">
        <!-- Glossar -->
        <div class="card-tipps-block">
          <NuxtLink to="/glossar" class="card-tipps">
            <div class="card-image-wrapper">
              <NuxtImg
                src="/img/glossarBild.jpg"
                class="card-image-index"
                alt=""
              />
              <h2 class="card-title">Glossar</h2>
            </div>
          </NuxtLink>
          <p class="card-text">
            Im Glossar findest du kurze Erklärungen zu wichtigen Begriffen rund
            um Barrierefreiheit, Inklusion und digitales Design. Die Begriffe
            sind einfach erklärt, ideal zum Nachschlagen oder schnellen
            Verstehen.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>

        <!-- Tipps -->
        <div class="card-tipps-block">
          <NuxtLink to="/tipps" class="card-tipps">
            <div class="card-image-wrapper">
              <NuxtImg
                src="/img/tippsBild.jpg"
                class="card-image-index"
                alt=""
              />
              <h2 class="card-title">Tipps und Tools</h2>
            </div>
          </NuxtLink>
          <p class="card-text">
            Hier findest du praktische Tipps und nützliche Tools, um digitale
            Barrierefreiheit direkt umzusetzen, egal ob beim Design, in der
            Programmierung oder beim Testen. Für alle, die barrierefrei
            entwickeln wollen.
          </p>
        </div>
      </div>
    </section>
    <p class="text-xl text-block mt-10 mb-10 ml-10 mr-10">
      *Dieser Erfahrungsbericht ist fiktiv und wurde erstellt, um typische
      Erfahrungen, Herausforderungen und Entscheidungswege beispielhaft
      darzustellen. Auch wenn die geschilderte Geschichte auf realitätsnahen
      Situationen basiert, handelt es sich nicht um eine echte Person oder ein
      tatsächliches Ereignis. Falls ihr eigene Erfahrungen teilen möchtet oder
      Fragen habt, meldet euch gern!
    </p>
  </main>
</template>
