module.exports = function(eleventyConfig) {
  // Set Liquid as the default template engine
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: true
  });

  // Create posts collection
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Copy static assets to the output directory
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Add a date filter for formatting
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Configure the input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["liquid", "md", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid"
  };
};
