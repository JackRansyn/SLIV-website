module.exports = function (eleventyConfig) {
  // Statische bestanden gewoon meekopiëren naar de output
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  // Datumnotatie zoals "14 aug 2026"
  eleventyConfig.addFilter("dutchDate", (dateObj) => {
    const maanden = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
    const d = new Date(dateObj);
    return `${String(d.getUTCDate()).padStart(2, "0")} ${maanden[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // RFC3339-datum, nodig voor de RSS-feed
  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => new Date(dateObj).toISOString());

  // Zet een relatieve URL om naar een volledige URL, nodig voor de RSS-feed
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      return url;
    }
  });

  // Meest recente datum uit een collectie, nodig voor de RSS-feed
  eleventyConfig.addFilter("newestDate", (collection) => {
    if (!collection || !collection.length) return new Date();
    return new Date(Math.max(...collection.map((item) => item.date.getTime())));
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