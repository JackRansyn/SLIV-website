# SLIV — Eleventy-project

## Structuur
- `content/werkgroepen/*.md` — de 6 werkgroepen (elk bestand = 1 kaart op de homepage)
- `content/nieuws/*.md` — nieuwsberichten, elk krijgt automatisch een eigen pagina
- `_includes/base.njk` — hoofdlayout (header, footer, thema-toggle)
- `_includes/nieuws-item.njk` — layout voor één nieuwsartikel
- `index.njk` — de homepage, bouwt de secties op uit de collecties hierboven
- `feed.njk` — genereert `/nieuws/feed.xml`
- `css/style.css`, `js/main.js` — ongewijzigd overgenomen uit het oorspronkelijke `sliv.html`

## Eerste keer opzetten
1. Zorg dat Node.js is geïnstalleerd (nodejs.org, LTS-versie).
2. Open deze map in VS Code, open een terminal (Terminal → New Terminal).
3. Installeer de dependencies:
   ```
   npm install
   ```
4. Start de lokale preview:
   ```
   npm start
   ```
   Dit opent de site op `http://localhost:8080`. Wijzigingen in `.md`- of `.njk`-bestanden worden automatisch ververst.

## Nieuw nieuwsbericht toevoegen (handmatig, zonder CMS)
Maak een nieuw bestand aan in `content/nieuws/`, bijvoorbeeld `2026-09-01-mijn-titel.md`, met dezelfde front matter (`title`, `date`, `excerpt`, `layout`, `permalink`) als de bestaande bestanden. Het verschijnt automatisch in de nieuwslijst én in de RSS-feed.

## Bouwen voor productie
```
npm run build
```
De kant-en-klare site komt in de map `_site` te staan — dit is wat je naar Netlify laat pushen.

## Bekend aandachtspunt
`feed.njk` gebruikt filters uit `@11ty/eleventy-plugin-rss` (`dateToRfc3339`, `getNewestCollectionItemDate`, `absoluteUrl`, `htmlToAbsoluteUrls`). Mocht `npm run build` hierop een foutmelding geven, stuur de foutmelding naar Claude — dat is in twee minuten te verhelpen.
