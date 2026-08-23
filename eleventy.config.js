const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // RSS-feed ondersteuning (levert filters als dateToRfc3339, absoluteUrl)
  eleventyConfig.addPlugin(pluginRss);

  // Statische bestanden gewoon meekopiëren naar de output
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  // Datumnotatie zoals "14 aug 2026"
  eleventyConfig.addFilter("dutchDate", (dateObj) => {
    const maanden = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    const d = new Date(dateObj);
    return `${String(d.getUTCDate()).padStart(2, "0")} ${maanden[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // Werkgroepen: gesorteerd op volgnummer (I t/m VI)
  eleventyConfig.addCollection("werkgroepen", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/werkgroepen/*.md")
      .sort((a, b) => a.data.volgnummer - b.data.volgnummer);
  });

  // Nieuws: nieuwste eerst
  eleventyConfig.addCollection("nieuws", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("content/nieuws/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
