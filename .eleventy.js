const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // 复制静态资源
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Markdown配置
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  eleventyConfig.setLibrary("md", md);
  
  // 日期过滤器
  eleventyConfig.addFilter("readableDate", dateObj => {
    const date = new Date(dateObj);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
  });
  
  eleventyConfig.addFilter("isoDate", dateObj => {
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0];
  });
  
  eleventyConfig.addFilter("chineseDate", dateObj => {
    const date = new Date(dateObj);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  });
  
  // 按日期排序
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
